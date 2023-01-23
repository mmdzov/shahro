/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import logo from "../../assets/imgs/logo.png";
import classes from "./Verification.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setAuthLoading,
  sendVerifyCode,
} from "../../store/actions/authActions";
import ReactCodeInput from "react-verification-code-input";
import { Helmet } from "react-helmet";
import { setHomeCinema } from "store/actions/cinemaAction";
import { setHomeCalendar } from "store/actions/calendarActions";
import { setHomeProduct } from "store/actions/productAction";
import { setHomeMedia } from "store/actions/mediaActions";
import { setHomeAds } from "store/actions/adsAction";
import {
  clearAccount,
  getHomeAccounts,
  setProfile,
} from "store/actions/accountAction";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AuthAlert from "components/Utilities/AuthAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Ripples from "components/Utilities/Ripples";

const Verification = ({
  history,
  setAuthLoading,
  auth,
  session,
  verifyCode,
  sendVerifyCode,
  loading,
}) => {
  const [number, setNumber] = useState(verifyCode);
  const [error, setError] = useState({
    show: false,
    text: "لطفا کد خود را به درستی وارد کنید",
  });
  const [l, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("sessionID");
    // document.getElementsByTagName("html")[0].className = "homeSlideList";
    // document.body.className = "homeSlideList";
    dispatch(clearAccount());
    // dispatch(isLoggedOut(true));
    dispatch(setHomeCinema([]));
    dispatch(setHomeCalendar([]));
    dispatch(setHomeProduct([]));
    dispatch(setHomeMedia([]));
    dispatch(getHomeAccounts([]));
    dispatch(setHomeAds([]));
    dispatch(setProfile());
  }, []);
  const hstr = useHistory();
  useEffect(() => {
    const authID = localStorage.getItem("authID");
    const sessionID = localStorage.getItem("sessionID");
    if (authID && sessionID) {
      hstr.replace("/", { auth, session });
      var refresh =
        window.location.protocol + "//" + window.location.host + "/";
      window.history.replaceState({ path: refresh }, "", refresh);
    } else if (!loading) {
      if (auth === null && session === null) {
        history.replace("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, session]);
  useEffect(() => {
    setNumber(verifyCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyCode]);
  const submitNumber = async (e) => {
    await setLoading(true);
    e.preventDefault();
    if (number !== "" && number.toString().length === 4) {
      setError((prevState) => ({
        ...prevState,
        show: false,
      }));
      const readyNumber = number
        .toString()
        .replace(/([۰-۹])/g, (token) =>
          String.fromCharCode(token.charCodeAt(0) - 1728)
        );

      setAuthLoading();
      await sendVerifyCode(readyNumber);
    } else {
      setError((prevState) => ({
        ...prevState,
        show: true,
      }));
    }
    await setLoading(false);
  };
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center homeSlideList">
      {l ? <ModalConnection /> : null}
      <Helmet>
        <title>فعال سازی حساب کاربری در میرسه</title>
      </Helmet>
      <div className="w-28">
        <img src={logo} alt="kashane" className="w-full" />
      </div>
      <h1
        className="font-bold text-2xl mt-5 text-gray-500"
        style={{ direction: "ltr" }}
      >
        {history.location.param}
      </h1>
      {notifAlert.mode === "verify" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <p className="my-3">کد فعال سازی برای شما پیامک شد.</p>
      <form
        className={`${classes.HideArrows} w-3/4 md:w-1/3 p-6`}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* {verifyCode !== "" ? ( */}
        <ReactCodeInput
          className={`${classes.InputNumber} mx-auto`}
          type="number"
          fields={4}
          fieldHeight={40}
          fieldWidth={40}
          values={verifyCode.toString().split("")}
          onChange={(n) => setNumber(n)}
        />
        {/* ) : null} */}
        {error.show ? (
          <p className="text-red-500 text-center text-sm font-bold mt-4">
            {error.text}
          </p>
        ) : null}
        <Ripples
        onClick={submitNumber}
        >
          <button
            type="submit"
            className="text-white block  w-1/2 md:w-7/12 lg:w-6/12 xl:w-4/12 mx-auto rounded-full bg-blue-600 my-5 p-3 focus:outline-none"
          >
            بزن بریم
          </button>
        </Ripples>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    redirectLogin: state.auth.redirectLogin,
    verifyCode: state.auth.verifyCode,
    auth: state.auth.authID,
    authAlert: state.auth.authAlert,
    session: state.auth.sessionID,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {
  setAuthLoading,
  sendVerifyCode,
})(Verification);
