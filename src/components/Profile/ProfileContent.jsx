/* eslint-disable react-hooks/exhaustive-deps */
// import ErrorImages from "components/Utilities/ErrorImages";
import { memo, useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProfileContent as Container } from "./Profile.styled";
import { Link } from "react-router-dom";
import EmptyBasket from "components/Basket/EmptyBasket";
import FolderIcon from "@material-ui/icons/Folder";
import { setLastProfilePosition } from "store/actions/accountAction";
import styled from "styled-components";
import useGetTheme from "hooks/useGetTheme";
import LineEllipsis from "components/Utilities/LineEllipsis";
import ProductModal from "components/Store/ProductModal";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CloseIcon from "@material-ui/icons/Close";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { ButtonBase, IconButton } from "@material-ui/core";
import MediaOrderBottomSheet from "page/Media/MediaOrderBottomSheet";
import StoreOrderBottomSheet from "page/Store/StoreOrderBottomSheet";
import usePath from "hooks/usePath";

const ProfileContent = () => {
  const { profile, profileTab: tab } = useSelector(({ account }) => account);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const t = (token, type) => {
    if (tab === "products") return `/store/product/${token}`;
    else if (tab === "links") return pathname;
    else if (tab === "posts") return `/media/post/${token}`;
    else if (tab === "main") {
      if (type === "post") return `/media/post/${token}`;
      else if (type === "product") return `/store/product/${token}`;
    }
  };
  const [open, setOpen] = useState(false);
  const r = useRef(null);
  const [widthLink, setWidthLink] = useState(150);
  const setSize = () => {
    const others = document.getElementsByClassName("others")[0];
    if (others) {
      const rect = others?.getBoundingClientRect();
      setWidthLink(rect?.width ?? 150);
    }
  };
  useEffect(() => {
    // console.log(tab);
    // console.log(profile?.[tab === "main" ? "all" : tab]);
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);
  useEffect(() => {
    // console.log(tab);
    // console.log(profile?.[tab === "main" ? "all" : tab]);
    if (Object.keys(profile)?.length > 0 && widthLink === 150) {
      const others = document.getElementsByClassName("others")[0];
      if (others) {
        const rect = others?.getBoundingClientRect();
        setWidthLink(rect?.width ?? 150);
      }
    }
  }, [profile]);
  const { goForward } = usePath();
  const [openMedia, setOpenMedia] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const handlePick = (callback = () => {}) => {
    setOpen(false);
    callback(true);
  };
  const handleGo = (link = "") => {
    setOpen(false);
    goForward(link, { from: "profile", user: profile?.account?.token });
  };
  const { colors } = useGetTheme();
  const handleManageAddButton = () => {
    const {
      allowToCreatePost: post,
      allowToCreateProduct: product,
      allowToCreateAds: ads,
    } = profile;
    if (post === 1 && product === 0 && ads === 0) handlePick(setOpenMedia);
    else if (post === 0 && product === 1 && ads === 0) handlePick(setOpenStore);
    else if (post === 0 && product === 0 && ads === 1) handleGo("/ads/compose");
    else setOpen(true);
  };
  useEffect(() => {
    console.log(tab, profile?.[tab]);
  }, [tab]);
  return (
    <Container
      isLink={tab === "links"}
      ref={r}
      h={tab === "links" ? "40px" : widthLink}
    >
      {profile?.all?.length === 0 && tab !== "links" ? (
        <EmptyBasket
          Icon={FolderIcon}
          msg={profile?.isMe ? "افزودن" : " "}
          button={profile?.isMe}
          title="هیچ مطلبی ثبت نشده"
          borderRadius="100px"
          background={colors?.primary?.background}
          color={colors?.primary?.color}
          padding="7px 15px"
          click={handleManageAddButton}
          style={{ height: 300, border: "0px" }}
        />
      ) : tab === "links" ? (
        profile?.[tab]?.map((item) => (
          <LinkItems
            className="links"
            href={item.link}
            key={~~(Math.random() * 9999999)}
          >
            {item.title}
          </LinkItems>
        ))
      ) : (
        profile?.[tab === "main" ? "all" : tab]?.map((item) => {
          // console.log(item);
          return (
            <Link
              key={~~(Math.random() * 99999999)}
              onClick={(e) =>
                dispatch(setLastProfilePosition(e.currentTarget.offsetTop))
              }
              className={item?.title.length > 0 ? "others" : ""}
              to={{
                pathname: t(item.token, item?.type),
                state: { from: "profile" },
              }}
              replace={!item.token ? true : false}
              style={{ width: "100%", height: "100%" }}
            >
              <div>
                <Img
                  src={item?.image ? item?.image : ""}
                  alt=""
                  hasimage={item?.image ? true : false}
                  className="BgError"
                />
                {/* <ErrorImages src={item.image} isInitial sizeIcon="4rem" /> */}
                {item?.title?.length > 0 ? (
                  <h3 style={{ paddingLeft: "5px" }}>
                    <LineEllipsis text={item?.title} maxLine="1" />
                  </h3>
                ) : null}
              </div>
            </Link>
          );
        })
      )}
      {open ? (
        <ProductModal
          padding="0"
          blur={() => {
            // setTimeout(() => {
            //   setOpen(false);
            // }, 1000);
            console.log("ok");
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Close>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
              <span>افزودن</span>
            </Close>
            <ItemContainer onClick={() => handlePick(setOpenMedia)}>
              <div className="icon">
                <TextFieldsIcon />
              </div>
              <div className="title">مطلب</div>
            </ItemContainer>
            <ItemContainer onClick={() => handlePick(setOpenStore)}>
              <div className="icon">
                <AddShoppingCartIcon />
              </div>
              <div className="title">محصول</div>
            </ItemContainer>
            <ItemContainer onClick={() => handleGo("/ads/compose")}>
              <div className="icon">
                <BusinessCenterIcon />
              </div>
              <div className="title">اگهی</div>
            </ItemContainer>
          </div>
        </ProductModal>
      ) : null}
      {profile?.isMe ? (
        <>
          <MediaOrderBottomSheet
            visible={openMedia}
            iconDisabled
            setVisible={setOpenMedia}
          />
          <StoreOrderBottomSheet
            visible={openStore}
            iconDisabled
            setVisible={setOpenStore}
          />
        </>
      ) : null}
    </Container>
  );
};

const LinkItems = styled.a`
  height: 40px !important;
`;

const ItemContainer = styled(ButtonBase)`
  display: grid !important;
  height: 50px !important;
  align-items: center;
  grid-template-columns: auto 1fr !important;
  padding: 0 13px !important;
  cursor: pointer !important;
  width: 100% !important;

  &:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }

  & .icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    color: #626262;
  }
  & .title {
    font-size: 0.9rem;
    text-align: right;
    font-weight: bold;
  }
`;
export const Close = styled.div`
  width: 100%;
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  padding-right: 20px;
`;

const Img = styled.img`
  width: inherit;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
  min-height: ${({ hasimage }) => (hasimage ? "100% !important" : "100%")};
`;

export default memo(ProfileContent);
