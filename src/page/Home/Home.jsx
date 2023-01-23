/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createElement, useEffect, useState } from "react";
import Navabar from "./Calendar/Navabar";
import Months from "./Calendar/Months/Months";
import FutureJobsList from "./Calendar/FutureJobs/FutureJobsList";
import Media from "./Media/Media";
import { useDispatch, useSelector } from "react-redux";
import { getAllHomeData } from "store/actions/_HomeAction";
import HomeStore from "page/Store/HomeStore";
import Accounts from "page/Accounts/Accounts";
import HomeAds from "page/Ads/HomeAds";
import { Helmet } from "react-helmet";
import Account from "../../components/Account/Account";
import HomeBar from "components/HomeBar/HomeBar";
import Cinema from "components/Cinema/Cinema";
// import Map from "components/Map/Map";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { setHomeCinema } from "store/actions/cinemaAction";
import { setHomeCalendar } from "store/actions/calendarActions";
import { setHomeProduct } from "store/actions/productAction";
import { setHomeMedia } from "store/actions/mediaActions";
import { setHomeAds } from "store/actions/adsAction";
import Splash from "page/Login/Splash";
import {
  clearAlert,
  fastAlert,
  setAlert,
  setLastScroll,
  setSplash,
} from "store/actions/_MainAction";
import AuthAlert from "components/Utilities/AuthAlert";
import AddIcon from "components/Utilities/AddIcon";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { memo } from "react";
import { setLoading as setL } from "store/actions/_MainAction";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import HomeFares from "page/Fares/HomeFares";
import Map from "components/Map/Map";

function Home() {
  const { isLoggedOut } = useSelector(({ auth }) => auth);
  const {
    splash,
    lastScroll,
    alert: notifAlert,
    fastAlert: fAlert,
    loading: l,
  } = useSelector(({ _MainReducer }) => _MainReducer);
  const {
    media: { homeMedia },
    calendar: { homeCalendar },
    product: { homeProduct },
    ads: { homeAds },
    cinema: { homeCinema },
  } = useSelector((state) => state);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isEmpty = (list) => {
    return list?.length === 0;
  };

  useEffect(() => {
    if (notifAlert.mode === "verify") {
      setTimeout(() => {
        dispatch(setSplash());
        dispatch(clearAlert());
      }, 3000);
    } else if (!notifAlert.mode) {
      const root = document.getElementById("root");
      root.style.position = "unset";
      root.style.width = "100%";
      root.style.right = "unset";
    }
  }, [notifAlert]);

  useEffect(() => {
    if (Object.keys(fAlert)?.length > 0) {
      const { title, message: msg, has } = fAlert;
      dispatch(setAlert({ mode: "verify", title, msg, has, show: 1 }));
    }
    if (
      !isLoggedOut &&
      isEmpty(homeMedia) &&
      isEmpty(homeAds) &&
      isEmpty(homeCalendar) &&
      isEmpty(homeCinema) &&
      isEmpty(homeProduct)
    ) {
      dispatch(getAllHomeData(history, state));
    } else dispatch(setSplash());
    dispatch(setL());
    return () => {
      dispatch(fastAlert({}));
      if (!isLoggedOut) {
        dispatch(clearAlert());
      }
    };
  }, []);

  useEffect(() => {
    if (
      (!isLoggedOut && !isEmpty(homeMedia)) ||
      !isEmpty(homeAds) ||
      !isEmpty(homeCalendar) ||
      !isEmpty(homeCinema) ||
      !isEmpty(homeProduct)
    )
      dispatch(setSplash());
    dispatch(setL());
  }, [homeAds, homeCalendar, homeCinema, homeMedia, homeProduct, isLoggedOut]);

  if (l.on) return <LodingDotPlus isRelative={false} isFixed />;
  if (splash) return <Splash isUser />;
  return (
    <>
      <Account />
      <Container className={`mx-auto`}>
        <Helmet>
          <title>اپلیکیشن شهری میرسه</title>
        </Helmet>
        {notifAlert.mode === "guest" || notifAlert.mode === "verify" ? (
          <AuthAlert
            alert={{ title: notifAlert?.title, message: notifAlert.msg }}
            go={() => {
              dispatch(fastAlert({}));
            }}
          />
        ) : null}
        {/* <Navabar /> */}
        {/* <Months /> */}
        <FutureJobsList />
        <Media />
        <HomeStore />
        <Accounts />
        <HomeAds />
        <HomeFares />
        {/* <HomeBar /> */}
        <Cinema />
        <Map />
        {/* <Icon>
        <img
          id="nbqergvjapfufukzesgtesgt"
          style={{ cursor: "pointer" }}
          onClick='window.open("https://logo.samandehi.ir/Verify.aspx?id=235600&p=uiwkxlaodshwgvkaobpdobpd", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
          alt="logo-samandehi"
          src="https://logo.samandehi.ir/logo.aspx?id=235600&p=odrfqftiujynwlbqlymalyma"
        />
      </Icon> */}
        <AddIcon
          mode="div"
          special
          Icon={ChatBubbleOutlineIcon}
          onClick={() => history.push("/chat")}
          style={{ zIndex: 10000 }}
        />
      </Container>
    </>
  );
}
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  padding-top: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Container = styled.div``;
export default memo(Home);
