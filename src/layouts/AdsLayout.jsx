import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import NotificationBar from "components/Notification/NotificationBar";
import { useDispatch, useSelector } from "react-redux";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useParams } from "react-router-dom";
import {
  setAccountPage,
  setEndPage,
  setFavorite,
  setLastProfilePosition,
  setProfile,
  setProfilePage,
} from "store/actions/accountAction";
import { setMyPosts } from "store/actions/postAction";
import { setMyProducts } from "store/actions/productAction";
import {
  setAdsData,
  setAdsSearchItems,
  setPage,
} from "store/actions/adsAction";
import SettingsIcon from "assets/svg/SettingsIcon";
import { setLoading, setSplash } from "store/actions/_MainAction";
import usePath from "hooks/usePath";
import usePageLabel from "hooks/usePageLabel";
import { IconButton } from "@material-ui/core";

const AdsLayout = ({ children }) => {
  const { goBack, goReplace, go, goAdvanceBack, goForward, getLastRoute } =
    usePath();
  const history = useHistory();
  const { labelName, label } = usePageLabel();
  const { state } = useLocation();
  const { token, category } = useParams();
  const { loading } = useSelector(({ notification }) => notification);
  const { profile } = useSelector(({ account }) => account);
  const dispatch = useDispatch();

  const handleBackClick = () => {
    const route = getLastRoute(-2).route;
    const { mode } = label;
    if (mode === "ads") {
      goReplace("/", true);
      dispatch(setLoading("adsToHome", true));
    } else if (mode === "ads-single") {
      console.log(state);
      // if (state && state?.lastPosition) goBack();
      if (state && state?.fromSearch) goBack();
      else if (state && state?.subFrom === "favorite") {
        goAdvanceBack("/favorite");
      } else goBack();
    } else if (mode === "addComment") goAdvanceBack("/ads");
    else if (mode === "category") goBack();
    else if (mode === "categoryList") goBack();
    else if (mode === "profile") {
      if (state?.from === "product") {
        goAdvanceBack(`/media/post/${state?.token}`, "post");
      } else goBack();
      dispatch(setSplash(true));
      dispatch(setProfile({}));
      dispatch(setProfilePage());
      dispatch(setEndPage(false));
      dispatch(setLastProfilePosition(0));
    } else if (mode === "notifications") goBack();
    else if (mode === "rent") goBack();
    else if (mode === "features") goBack();
    else if (mode === "mediaSearch") {
      goBack();
    } else if (mode === "fareSearch") {
      goBack();
    } else if (mode === "followings") goBack();
    else if (mode === "followers") goBack();
    else if (mode === "map") goBack();
    else if (mode === "rentItem") goBack();
    else if (mode === "submitBasket") goBack(`/store/basket`);
    else if (mode === "addPost") goBack("/media");
    else if (mode === "favorite") {
      dispatch(setFavorite());
      dispatch(setAccountPage(0));
      // goAdvanceBack("/setting");
      goBack();
    } else if (mode === "editPost") goBack();
    else if (mode === "addProduct") goBack("/store");
    else if (mode === "editProduct") goAdvanceBack(`/store/product/${token}`);
    else if (mode === "movie") goBack();
    else if (mode === "wallet") goBack();
    else if (mode === "adsFilter") {
      if (state?.from === "adsSingle") {
        goBack();
        dispatch(setPage(1));
        dispatch(setAdsData([]));
      } else goForward("/ads", { from: "adsFilter" });
      dispatch(setAdsData());
    } else if (mode === "adsSearch") {
      dispatch(setAdsData());
      dispatch(setPage(1));
      dispatch(setAdsSearchItems([]));
      goReplace("/ads", true);
    } else if (mode === "adsOrder") goBack();
    else if (mode === "adsComposeCat") goBack();
    else if (mode === "myPosts") {
      goBack();
      if (state?.from === "setting") dispatch(setMyPosts([]));
    } else if (mode === "myProducts") {
      goBack();
      if (state?.from === "setting") dispatch(setMyProducts([]));
    } else if (mode === "adsCats") {
      if (+category > 1) {
        go(`/ads/compose/${category - 1}`);
      } else {
        console.log(state?.from, state?.user);
        if (state?.from === "profile")
          goReplace(`/profile/${state?.user}`, true);
        else go("/ads");
      }
    } else if (mode === "َadsComposeNew") {
      goBack();
    } else if (mode === "adsComposeEdit") goBack();
    else goBack();
    if (route === "/") {
      dispatch(setLoading("adsToHome", true));
    }
  };
  const handleGoSearch = () => {
    console.log(label);
    if (label?.mode === "rent") {
      history.push("/rent/search");
    } else if (label?.mode === "ads" || label?.mode === "adsFilter") {
      history.push("/ads/search");
    }
  };
  return (
    <div
      className=""
      style={{ width: "auto", height: "auto", position: "relative" }}
    >
      <ContainerLayout
        hasCenter={label?.align === "center"}
        className={`toolbarBackground customToolbar  relative text-black font-bold`}
        style={{ cursor: label.mode === "profile" ? "pointer" : "unset" }}
      >
        <ArrowRight
          className={`cursor-pointer`}
          onClick={handleBackClick}
          style={{ zIndex: label.align === "center" ? 9 : 0 }}
        >
          <ChevronRightIcon />
        </ArrowRight>
        <h2
          className={`text-center`}
          style={{
            textAlign: label.align,
            marginRight: label.align !== "center" ? "20px" : "0px",
            whiteSpace: "nowrap",
            paddingTop: 3,
            position: label.align === "center" ? "absolute" : "unset",
            width: "100%",
          }}
          onClick={
            label.mode === "profile" && profile?.isMe
              ? () => history.push("/setting", { from: "profile" })
              : () => {}
          }
        >
          {labelName}
        </h2>
        {label.mode === "ads" ||
        label.mode === "adsFilter" ||
        label.mode === "rent" ? (
          <div
            style={{
              width: 37,
              cursor: "pointer",
              zIndex: label.align === "center" ? 9 : 0,
            }}
            onClick={handleGoSearch}
          >
            <svg
              enableBackground="new 0 0 100 100"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 100 100"
            >
              <path
                clipRule="evenodd"
                d="M64.5,44.6c0-11.6-9.4-20.9-20.9-20.9c-11.6,0-20.9,9.4-20.9,20.9  c0,11.6,9.4,20.9,20.9,20.9C55.1,65.6,64.5,56.2,64.5,44.6z M80,79.3l-1.8,1.8l-19-19c-4.2,3.7-9.6,6-15.7,6  c-13,0-23.5-10.5-23.5-23.5c0-13,10.5-23.5,23.5-23.5c13,0,23.5,10.5,23.5,23.5c0,6-2.3,11.5-6,15.7L80,79.3z"
                fill="#000000"
                fillRule="evenodd"
              />
            </svg>
          </div>
        ) : label.mode === "profile" && profile?.isMe ? (
          <IconContainer
            style={{ zIndex: label.align === "center" ? 9 : 0 }}
            onClick={
              label.mode === "profile"
                ? () => history.push("/setting", { from: "profile" })
                : () => {}
            }
          >
            <IconButton style={{ width: "40px", height: "40px" }}>
              <SettingsIcon />
            </IconButton>
          </IconContainer>
        ) : null}
      </ContainerLayout>
      <NotifContainer>
        {label.mode === "notifications" ? (
          loading ? (
            <LodingDotPlus isRelative={false} isFixed />
          ) : (
            <>
              <NotificationBar />
              {children}
            </>
          )
        ) : (
          <div style={{ marginTop: 42, overflowX: "hidden" }}>{children}</div>
        )}
      </NotifContainer>
    </div>
  );
};

const ArrowRight = styled.div`
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;
const NotifContainer = styled.div`
  margin-top: 0px;
  /* margin-top: 65px; */
  /* z-index: 99999; */
  position: relative;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  margin-top: 0px;
  margin-left: 4px;
`;
const ContainerLayout = styled.nav`
  display: grid;
  grid-template-columns: 1fr 100fr 1fr;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  justify-items: ${({ hasCenter }) =>
    hasCenter ? "self-end !important" : "unset"};
  /* background: #ffffff !important; */
  height: 42;
  align-items: center;
  box-shadow: 1px 1px 2px #b2b2b2a3;
`;

export default AdsLayout;
