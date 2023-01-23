/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonBase } from "@material-ui/core";
import SubmitBasketDetails from "components/SubmitBasket/SubmitBasketDetails";
import SubmitBasketLocation from "components/SubmitBasket/SubmitBasketLocation";
import SubmitBasketOffCode from "components/SubmitBasket/SubmitBasketOffCode";
import SubmitBasketPaymentMethod from "components/SubmitBasket/SubmitBasketPaymentMethod";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import usePath from "hooks/usePath";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLocation } from "store/actions/accountAction";
import {
  getBasket,
  setDiscount,
  submitBasketSend,
} from "store/actions/productAction";
import { clearAlert, setAlert } from "store/actions/_MainAction";
import styled from "styled-components";

const SubmitBasket = () => {
  const { location } = useSelector(({ account }) => account);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [check, setCheck] = useState(1);
  const getDatas = async () => {
    setLoading(true);
    await dispatch(getBasket());
    await dispatch(getLocation());
    setLoading(false);
  };
  const { goForward } = usePath();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location && Object.keys(location)?.length > 0) {
      setSubmit(true);
    }
  }, [location]);
  useEffect(() => {
    getDatas();
    return () => {
      dispatch(setDiscount());
      dispatch(clearAlert());
    };
  }, []);
  const handleSubmit = async () => {
    if (!location || !Object.keys(location)?.length === 0) {
      return dispatch(
        setAlert({
          mode: "submitBasketSendError",
          has: 1,
          msg: "درحال حاظر موقعیت مکانی ثبت نکردید لطفا ابتدا یک موقعیت مکانی ثبت کنید.",
          title: "خطای موقعیت مکانی",
          show: true,
        })
      );
    }
    await setLoading1(true);
    await dispatch(
      submitBasketSend(
        check,
        (orderToken) => {
          goForward(`/order/${orderToken}`);
        },
        setLoading1
      )
    );
  };

  const handleOpenAlert = () => {
    dispatch(
      setAlert({
        mode: "submitBasketSendError",
        has: 1,
        msg: "درحال حاظر موقعیت مکانی ثبت نکردید لطفا ابتدا یک موقعیت مکانی ثبت کنید.",
        title: "خطای موقعیت مکانی",
        show: true,
      })
    );
  };

  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      <Helmet>
        <title>مرحله نهایی خرید - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"مرحله نهایی خرید - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      {notifAlert.mode === "submitBasketSendError" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => dispatch(clearAlert())}
        />
      ) : null}
      {notifAlert.mode === "emptyBasket" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => history.replace("/store")}
        />
      ) : null}
      {loading1 ? <ModalConnection /> : null}
      <SubmitBasketLocation />
      <SubmitBasketPaymentMethod check={check} setCheck={setCheck} />
      <SubmitBasketOffCode />
      <SubmitBasketDetails />
      <Btn
        bg={isSubmit || notifAlert.mode === "emptyBasket" ? "#008eff" : "#ccc"}
        style={{
          cursor: "pointer",
        }}
        className={`${
          !isSubmit || (notifAlert.mode === "emptyBasket" && "acceptBtnMuted")
        }`}
        onClick={isSubmit ? () => handleSubmit() : () => handleOpenAlert()}
      >
        <ButtonBase style={{ width: "100%", height: "100%" }}>
          پرداخت
        </ButtonBase>
      </Btn>
    </Container>
  );
};

const Btn = styled.button`
  height: 50px;
  position: fixed;
  bottom: 0;
  color: white;
  z-index: 100;
  background: ${({ bg }) => bg};
  width: 100%;
  font-size: 1.1rem;
`;

const Container = styled.div`
  padding-bottom: 60px;
`;
export default SubmitBasket;
