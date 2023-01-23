/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import logo from "../../assets/imgs/logo.png";
import classes from "./Login.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setAuthLoading,
  getGuestToken,
  signIn,
  setRedirectLogIn,
  isLoggedOut,
} from "../../store/actions/authActions";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import Splash from "./Splash";
import { useHistory } from "react-router-dom";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import CloseIcon from "@material-ui/icons/Close";
import { setHasEndPages, setSplash } from "store/actions/_MainAction";
import { setProfile, setProfilePage } from "store/actions/accountAction";
import Ripple from "components/Utilities/Ripples";
const Login = ({ setAuthLoading, signIn, setRedirectLogIn }) => {
  const { alert: notifAlert, splash: splsh } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  // useEffect(() => {
  //   const html = document.getElementsByTagName("html")[0];
  //   const root = document.getElementById("root");
  //   const body = document.body;
  //   html.style.height = "100%";
  //   body.style.height = "100%";
  //   root.style.height = "100%";
  // }, []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [error, setError] = useState({
    show: false,
    text: "شماره نادرست است",
  });

  const history = useHistory();

  const submitNumber = async (e) => {
    await setLoading(true);
    e.preventDefault();
    if (number !== "" && number.length === 11) {
      setError((prevState) => ({
        ...prevState,
        show: false,
      }));
      const readyNumber = number
        .slice(1, 12)
        .replace(/([۰-۹])/g, (token) =>
          String.fromCharCode(token.charCodeAt(0) - 1728)
        );
      setAuthLoading();
      await signIn(readyNumber);
    } else {
      setError((prevState) => ({
        ...prevState,
        show: true,
      }));
    }
    await setLoading(false);
  };
  const [onload, setOnload] = useState(true);
  const { isLoggedOut: isLogout } = useSelector(({ auth }) => auth);

  useEffect(() => {
    setTimeout(() => {
      setOnload(false);
    }, 1200);
    return () => {
      if (isLogout) return dispatch(isLoggedOut());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGuest = async () => {
    // if (isLogout) return;
    await dispatch(setSplash(true));
    await setOnload(false);
    await setAuthLoading();
    await dispatch(getGuestToken());
    await setRedirectLogIn();
    await history.replace("/");
    var refresh = window.location.protocol + "//" + window.location.host + "/";
    window.history.replaceState({ path: refresh }, "", refresh);
  };

  const handleClick = () => {
    setGuest();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    let val = value.match(/[0-9]/g)?.join("");
    // if (val?.length >= 5) setAlert((prev) => ({ ...prev, [name]: "" }));
    if (val?.length <= 11) setNumber(val);
    else if (!val) setNumber(val || "");
  };

  const [modal, openModal] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    dispatch(setProfilePage(0));
    dispatch(setProfile());
    dispatch(setHasEndPages(false));
    setHeight(window.innerHeight - 250);
  }, []);
  // h-screen removed from container
  // if (splsh && onload) return <LodingDotPlus isRelative={false} />;
  if (onload) return <LodingDotPlus isRelative={false} isFixed />;
  if (splsh) return <Splash isUser />;
  return (
    <Container
      // style={{ height: "100%" }}
      className="flex overflow-hidden flex-col justify-center items-center homeSlideList"
    >
      {loading ? <ModalConnection /> : null}
      <Helmet>
        <title>ورود به حساب کاربری در میرسه</title>
      </Helmet>
      {/* {load ? <LodingDotPlus isRelative={false} /> : null} */}
      {notifAlert.mode === "signInError" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
        />
      ) : null}
      <div className="w-28">
        <img src={logo} alt="kashane" className="w-full" />
      </div>
      <h1 className="font-bold text-2xl mt-5">ورود به میرسه</h1>
      <p className="mt-3">لطفا شماره تلفن همراه خود را وارد کنید.</p>
      <Form
        className={`${classes.HideArrows} w-full align-middle`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          style={{
            padding: "0 10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Input
            type="tel"
            inputMode="numeric"
            name="number"
            value={number}
            autoComplete="off"
            onChange={handleChange}
            className="inputFocused"
            // ref={rf}
            // focusBorder={alert.code ? "2px solid #dc3e3e" : ""}
          />
        </div>
        {error.show ? (
          <p className="text-red-500 text-center text-sm font-bold mt-4">
            {error.text}
          </p>
        ) : null}
        <div className="mx-auto">
          <Ripples onClick={submitNumber}>
            <button
              type="submit"
              style={{ width: 100, margin: "5px 0px" }}
              className="text-white block cursor-pointer primary md:w-3/12 lg:w-3/12 xl:w-2/12 mx-auto rounded-full p-3 focus:outline-none"
            >
              بزن بریم
            </button>
          </Ripples>
        </div>
      </Form>
      <Ripple color="gray" onClick={handleClick}>
        <button
          className="cursor-pointer focus:outline-none "
          style={{ padding: "5px 10px", borderRadius: 5 }}
        >
          ورود به عنوان مهمان
        </button>
      </Ripple>
      <SwipeUp
        onChange={() => openModal(false)}
        open={modal}
        overflowHeight={!modal ? 0 : 1}
      >
        <Scroll style={{ height: height, direction: "rtl" }}>
          {modal ? (
            <HeaderContainer className="homeSlideList">
              <span>قوانین و ضوابط</span>
              <div className="" onClick={() => openModal(false)}>
                <CloseIcon />
              </div>
            </HeaderContainer>
          ) : null}
          <div className="" style={{ padding: "10px 15px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
            aliquam nulla eveniet omnis facilis pariatur modi, veniam corporis
            beatae at eius in, maiores reprehenderit labore vitae et consectetur
            deserunt similique?Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos explicabo nostrum doloremque
            blanditiis quidem voluptates! Cupiditate laboriosam ullam nihil
            recusandae enim, quidem omnis ducimus quasi magnam, reiciendis,
            incidunt laudantium laborum?Lorem ipsum dolor, sit amet consectetur
          </div>
        </Scroll>
      </SwipeUp>
      <Intro className=" text-sm label">
        <Terms>
          با ثبت نام در شهرو{" "}
          <span
            onClick={() => openModal(true)}
            style={{ color: "#007eff", cursor: "pointer" }}
          >
            شرایط و قوانین
          </span>{" "}
          را میپذیرم
        </Terms>
        {/*
        تمامی پروژه توسط گروه اسرز مدیریت می شود.
        */}
      </Intro>
    </Container>
  );
};

const Ripples = styled(Ripple)`
  width: 100px;
  height: 60px;
  margin: 10px auto;
  border-radius: 101px;
`;

const Terms = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: -30px;
  margin-bottom: 10px;
`;

const SwipeUp = styled(SwipeableBottomSheet)``;

const Form = styled.form`
  padding: 0;
  margin-top: 30px;
`;

const Container = styled.div`
  /* height: auto !important; */
  padding-top: 60px !important;
  width: 100%;
  /* @media (max-height: 529px) {
    .label {
      position: unset !important;
      margin-top: 120px !important;
    }
  }
  @media (min-height: 530px) {
    .label {
      margin-top: 0px;
      position: fixed;
      bottom: 0px;
    }
  } */
`;
const Intro = styled.p`
  margin-top: 100px;
  text-align: center;
  padding-bottom: 10px;
`;

const mapStateToProps = (state) => {
  return {
    redirectLogin: state.auth.redirectLogin,
    loading: state.auth.loading,
  };
};

const Input = styled.input`
  height: 55px;
  max-width: 300px;
  padding: 10px;
  border-radius: 5px;
  width: inherit;
  box-sizing: border-box;
  font-size: 0.9rem;
  direction: ltr;
  text-align: left;
`;

const HeaderContainer = styled.div`
  height: 46px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  justify-content: space-between;
  padding: 0 15px;
  /* border-radius: 30px 30px 0 0; */
  display: flex;
  align-items: center;
  z-index: 9999;
  position: absolute;
  top: -45px;
  width: 100%;
  left: 0;
  border-radius: 15px 15px 0 0;
`;

export default connect(mapStateToProps, {
  setAuthLoading,
  signIn,
  setRedirectLogIn,
})(Login);
