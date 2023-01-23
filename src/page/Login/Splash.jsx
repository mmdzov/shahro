/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import logo from "../../assets/imgs/logo.png";
import LoadingDotPlus from "../../components/Utilities/Loadings/LoadingDotPlus";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, setSplash } from "store/actions/_MainAction";

const Splash = ({ isUser = false }) => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notifAlert.mode === "guest") {
      setTimeout(() => {
        dispatch(setSplash());
        dispatch(clearAlert());
      }, 3000);
    }
  }, [notifAlert]);
  return (
    <div className="flex flex-col w-screen h-screen justify-around items-center globalLoading">
      <Helmet>
        <title>اپلیکیشن شهری میرسه</title>
      </Helmet>
      <div
        className="w-40 globalLoading"
        style={{ marginTop: isUser ? 80 : 0 }}
      >
        <img src={logo} alt="kashane" className="w-full" />
      </div>
      <LoadingDotPlus isUser={isUser} isBg={isUser} />
    </div>
  );
};

export default Splash;
