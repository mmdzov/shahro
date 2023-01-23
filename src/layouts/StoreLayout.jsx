/* eslint-disable no-unused-vars */
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory, useLocation } from "react-router";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  clearBasket,
  setStoreSearchItems,
} from "../store/actions/productAction";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Modal from "components/Utilities/Modal/Modal";
import MenuTemp from "components/Utilities/MenuTemp";
import {
  ModalBtn,
  ModalWrapper,
} from "components/Utilities/ModalButton/ModalButton";
import SlideTempMenuLoader from "components/SlideTemp/SlideTempMenuLoader";
import AdsSlideTempLoader from "components/SlideTemp/AdsSlideTempLoader";
import { Fragment } from "react";
import AdsSlider from "components/Store/AdsSlider";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import {
  clearErrMsg,
  setAlert,
  setErrMsg,
  setLoading,
  setSplash,
} from "store/actions/_MainAction";
import { useParams } from "react-router-dom";
import storeService from "api/storeService";
import handleApiErrors from "utilities/handleApiErrors";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AuthAlert from "components/Utilities/AuthAlert";
import usePath from "hooks/usePath";
import { ReactComponent as ShoppingCartIcon } from "assets/svg/image2vector.svg";
import toPersian from "utilities/ToPersian";
const StoreLayout = ({ children }) => {
  const history = useHistory();
  const { pathname, state } = useLocation();
  const [modal, setModal] = useState(false);
  const { account } = useSelector(({ account }) => account);
  const [isProd, setIsProd] = useState({ align: "", mode: "" });
  const { token } = useParams();

  const dispatch = useDispatch();
  const {
    loading,
    basketCount: bCount,
    basket,
    categories: cats,
    order,
    comments,
  } = useSelector(({ product }) => product);
  const {
    goAdvanceBack,
    go,
    goForward,
    goReplace,
    removePath,
    goBack,
    getLastRoute,
  } = usePath();
  const handleBackClick = () => {
    const route = getLastRoute(-2).route;
    if (isProd.mode === "productOrder") {
      if (state?.from !== "setting") goReplace("/");
      else goBack();
    } else if (isProd.mode === "basket") goBack();
    else if (isProd.mode === "comments")
      goReplace(`/store/product/${token}`, true);
    else if (isProd.mode === "store") {
      if (state?.from === "orderToStore") goReplace("/");
      else if (state?.from === "order") goBack();
      else {
        goReplace("/", true);
        dispatch(setLoading("storeToHome", true));
      }
    } else if (isProd.mode === "product") {
      if (state?.from === "profile")
        goAdvanceBack(`/profile/${account?.token}`, "profile");
      else if (state?.subFrom === "favorite")
        goReplace("/favorite", {
          mode: state?.mode,
          position: state?.position,
        });
      else if (state?.from === "order") goReplace("/store");
      else goBack();
    } else if (isProd.mode === "order") goBack();
    else if (isProd.mode === "facture") {
      removePath(state?.from, ({ pathname: path }) => {
        console.log(state?.from);
        console.log(path);
        if (state?.from === "product") goReplace(path, { from: "order" });
        else if (state?.from === "store")
          goReplace(`/store`, { from: "orderToStore" });
        else {
          goBack();
        }
      });
    } else if (isProd.mode === "storeSearch") {
      go("/store");
      dispatch(setStoreSearchItems());
    } else goBack();
    if (route === "/") {
      dispatch(setLoading("storeToHome", true));
    }
  };
  const [l, setL] = useState(false);
  const handleCancelOrder = async () => {
    setL(true);
    dispatch(clearErrMsg());
    try {
      const data = await storeService.orderCancel(token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          dispatch(
            setAlert({
              show: true,
              has: alert.has,
              msg: alert.message,
              title: alert.title,
              mode: "orderCancel",
            })
          );
          history.replace("/order");
          setL(false);
        })
        .catch((e) => {
          dispatch(
            setAlert({
              show: true,
              has: e.has,
              msg: e.message,
              title: e.title,
              mode: "orderCancel",
            })
          );
          setL(false);
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      setL(true);
      dispatch(setErrMsg(e));
    }
  };

  const handleOpenBasket = () => {
    history.push("/store/basket", { from: isProd.mode, TOKEN: token });
  };
  const handleClearBasket = () => {
    dispatch(clearBasket(setModal));
  };
  useEffect(() => {
    let item = pathname.split("/");
    if (item.includes("product"))
      setIsProd({ mode: "product", align: "right" });
    else if (item[2] === "basket")
      setIsProd({ mode: "basket", align: "right" });
    else if (item[1] === "order" && item[2]?.length > 10)
      setIsProd({ mode: "facture", align: "right" });
    else if (item[1] === "store" && item.includes("search"))
      setIsProd({ mode: "storeSearch", align: "right" });
    else if (item.includes("add") && item.includes("comments")) {
      setIsProd({ mode: "addComment", align: "right" });
      return;
    } else if (item[2] === "comments")
      setIsProd({
        mode: "comments",
        align: "right",
        value: comments?.comments?.length.toLocaleString("fa-IR"),
      });
    else if (item[1] === "order") {
      setIsProd({ mode: "productOrder", align: "right" });
    } else setIsProd({ mode: "store", align: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    setIsProd((prev) => ({ ...prev, value: comments?.count }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, loading]);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <>
      {l ? <ModalConnection /> : null}
      {notifAlert.mode === "orderCancel" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <div
        className=""
        style={{ width: "auto", height: "auto", position: "relative" }}
      >
        <ContainerLayout
          isSearch={isProd.mode === "store"}
          zIndex={isProd.mode === "productOrder"}
          className={`toolbarBackground customToolbar relative text-black font-bold `}
        >
          {modal ? (
            <Modal
              opacity="1"
              w="87%"
              style={{ fontSize: 13, fontWeight: 600, paddingBottom: 4 }}
              // blur={() => setModal(false)}
            >
              <Question>میخواهید سبد خرید خود را خالی کنید؟</Question>
              <ModalWrapper>
                <ModalBtn
                  children="بله"
                  mode="full"
                  onClick={handleClearBasket}
                />
                <ModalBtn children="خیر" onClick={() => setModal(false)} />
              </ModalWrapper>
            </Modal>
          ) : null}
          <ArrowRight className={`cursor-pointer`} onClick={handleBackClick}>
            <ChevronRightIcon />
          </ArrowRight>
          <h2
            className={`text-center`}
            style={{
              textAlign: isProd.align,
              marginRight: isProd.align !== "center" ? 20 : 0,
              paddingTop: 3,
              paddingRight: isProd.align === "center" ? "15px" : "0px",
              // position: "absolute",
              // left: "50%",
              // transform: "translate(-30px, 0px)",
            }}
          >
            {isProd.mode === "store"
              ? "فروشگاه"
              : isProd.mode === "basket"
              ? "سبد خرید"
              : isProd.mode === "product"
              ? "جزئیات محصول"
              : isProd.mode === "comments"
              ? `تعداد نظرات ${(isProd?.value ?? 0).toLocaleString("fa-IR")}`
              : isProd.mode === "addComment"
              ? "ثبت نظر"
              : isProd.mode === "productOrder"
              ? "پیگیری سفارشات"
              : isProd.mode === "facture"
              ? "جزئیات سفارش"
              : isProd.mode === "storeSearch"
              ? "جستجو فروشگاه"
              : null}
          </h2>
          {/* <div className=""></div> */}
          {isProd.mode !== "comments" ? (
            isProd.mode === "basket" ? (
              !loading && basket.length !== 0 ? (
                <div
                  onClick={() => setModal(true)}
                  style={{ cursor: "pointer", marginLeft: "20px" }}
                >
                  <RemoveShoppingCartIcon />
                </div>
              ) : null
            ) : isProd.mode !== "addComment" &&
              isProd.mode !== "facture" &&
              isProd.mode !== "productOrder" &&
              isProd.mode !== "storeSearch" ? (
              <ShoppingBasketContainer
                onClick={handleOpenBasket}
                style={{ marginLeft: isProd.mode === "store" ? "5px" : "20px" }}
              >
                <ShoppingCartIcon />
                {bCount > 0 ? (
                  <BasketCount>
                    {bCount > 99
                      ? toPersian("99+")
                      : bCount?.toLocaleString("fa-IR")}
                  </BasketCount>
                ) : null}
              </ShoppingBasketContainer>
            ) : null
          ) : null}

          {isProd.mode === "facture" &&
          Object.keys(order)?.length > 0 &&
          order?.products?.length > 0 &&
          order?.order?.status !== 5 ? (
            <div
              style={{
                fontSize: ".8rem",
                color: " #888",
                cursor: "pointer",
                marginLeft: "20px",
              }}
              onClick={handleCancelOrder}
            >
              انصراف
            </div>
          ) : null}
          {isProd.mode === "store" ? (
            <div
              style={{ width: 37, cursor: "pointer", marginLeft: "10px" }}
              onClick={() => goForward("/store/search")}
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
          ) : null}
        </ContainerLayout>
      </div>
      <div style={{ marginTop: 42 }} className="homeSlideList">
        {isProd.mode === "store" && !loading ? (
          <>
            <AdsSlider />
            <MenuTemp list={cats} label="store" />
          </>
        ) : null}

        {isProd.mode === "store" && loading ? (
          <Fragment>
            <AdsSlideTempLoaderContainer>
              <AdsSlideTempLoader />
            </AdsSlideTempLoaderContainer>
            <SlideTempMenuLoader store />
          </Fragment>
        ) : null}
        {children}
      </div>
    </>
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
const AdsSlideTempLoaderContainer = styled(Scroll)`
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 10px;
`;
const Question = styled.div`
  padding-bottom: 15px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f1f1f;
`;
const ShoppingBasketContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  height: 25px;
`;

const BasketCount = styled.span`
  font-size: 1rem;
  line-height: 23px;
  font-weight: 500;
  background: #f92424;
  padding: 0 2px;
  height: 20px;
  position: absolute;
  left: 16px;
  color: #ffffff;
  top: -5px;
  width: 20px;
  text-align: center;
  border-radius: 100px;

  /* font-size: 12px;
  line-height: 27px;
  font-weight: 500;
  background: #d0cfcf;
  padding: 0 2px;
  height: 24px;
  position: absolute;
  left: 17px;
  color: white;
  top: 4px; */
`;
const ContainerLayout = styled.nav`
  display: grid;
  grid-template-columns: 1fr 100fr 1fr ${({ isSearch }) =>
      isSearch ? "1fr" : "0fr"};
  position: fixed;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: ${({ zIndex }) => (zIndex ? 1 : 10000)};
  /* background: ${({ zIndex }) =>
    zIndex ? "#ffffff" : "#ffffff"} !important; */
  height: 42;
`;
export default StoreLayout;
