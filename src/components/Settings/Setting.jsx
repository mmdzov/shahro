/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  Version,
  Item,
  List,
  Number,
  Username,
  ImageBox,
  ItemContainer,
} from "./Setting.styled";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useEffect, useState } from "react";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import toPersian from "utilities/ToPersian";
import {
  clearAccount,
  clearProfileImage,
  getAccount,
  getHomeAccounts,
  setEndPage,
} from "store/actions/accountAction";
import useLoading from "hooks/useLoading";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import ErrorImages from "components/Utilities/ErrorImages";
import accountService from "api/accountService";
import {
  clearErrMsg,
  setAllowToCreate,
  setErrMsg,
} from "store/actions/_MainAction";
import handleApiErrors from "utilities/handleApiErrors";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import { clearUser, isLoggedOut } from "../../store/actions/authActions";
import { setHomeCinema } from "store/actions/cinemaAction";
import { setHomeCalendar } from "store/actions/calendarActions";
import { setHomeProduct } from "store/actions/productAction";
import { setHomeMedia } from "store/actions/mediaActions";
import { setHomeAds } from "store/actions/adsAction";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import InboxIcon from "@material-ui/icons/Inbox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AreYouSure from "components/Utilities/AreYouSure";
import PaymentIcon from "@material-ui/icons/Payment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { ButtonBase } from "@material-ui/core";
import usePath from "hooks/usePath";

const Setting = () => {
  const [data] = useState([
    {
      name: "ویرایش حساب",
      Icon: EditOutlinedIcon,
      isEnable: true,
      link: "/edit",
    },
    {
      name: "پیگیری سفارش",
      Icon: LocalGroceryStoreIcon,
      isEnable: true,
      link: "/order",
    },
    {
      name: "تنظیمات عمومی",
      Icon: SettingsIcon,
      isEnable: false,
      link: "/disabled",
    },
    {
      name: "آگهی من",
      Icon: EmojiObjectsOutlinedIcon,
      isEnable: true,
      link: "/ads/order",
    },
    {
      name: "مطالب من",
      Icon: InboxIcon,
      isEnable: true,
      link: "/media/order",
    },
    {
      name: "محصولات من",
      Icon: StorefrontIcon,
      isEnable: true,
      link: "/store/order",
    },
    {
      name: "اعلان ها",
      Icon: NotificationsNoneIcon,
      isEnable: true,
      link: "/notifications",
    },
    {
      name: "کیف پول",
      Icon: PaymentIcon,
      isEnable: true,
      link: "/wallet",
    },
    {
      name: "علاقه مندی ها",
      Icon: BookmarkBorderIcon,
      isEnable: true,
      link: "/favorite",
    },
    {
      name: "حریم خصوصی و امنیت",
      Icon: LockOutlinedIcon,
      isEnable: false,
      link: "/disabled",
    },
    {
      name: "نشست های فعال",
      Icon: SettingsIcon,
      isEnable: true,
      link: "/sessions",
    },
    {
      name: "زبان",
      Icon: TranslateOutlinedIcon,
      isEnable: false,
      link: "/disabled",
    },
    {
      name: "خروج از حساب کاربری",
      Icon: CloseOutlinedIcon,
      isEnable: true,
      link: "/q",
    },
  ]);
  const history = useHistory();
  const [connection, setConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const { account, image } = useSelector(({ account }) => account);
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  const { loading } = useLoading(account);
  const { isLoggedOut: isLogout } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(account).length === 0) {
      dispatch(getAccount());
    }
    // return () => dispatch(clearAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logout = async () => {
    if (isLogout) return;
    dispatch(clearErrMsg());
    setConnection(true);
    setOpen(false);
    dispatch(setAllowToCreate(0));
    dispatch(clearAccount());
    dispatch(clearProfileImage());
    try {
      const data = await accountService.logout();
      handleApiErrors(data).then((res) => {
        localStorage.removeItem("authID");
        localStorage.removeItem("sessionID");
        dispatch(clearUser());
        setConnection(false);
        dispatch(isLoggedOut(true));
        dispatch(setHomeCinema([]));
        dispatch(getHomeAccounts([]));
        dispatch(setHomeCalendar([]));
        dispatch(setHomeProduct([]));
        dispatch(setHomeMedia([]));
        dispatch(setHomeAds([]));
        dispatch(clearAccount());
        dispatch(setEndPage(false));
        history.replace("/login");
      });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };
  const [from] = useState({ from: "setting" });
  const { getLastRoute } = usePath();
  useEffect(() => {
    const lastRouteState = getLastRoute(-2).state;
    console.log(lastRouteState);
    if (lastRouteState?.position) {
      window.scrollTo(0, lastRouteState?.position);
    }
  }, []);
  const handleGo = (link) => {
    if (link === "/disabled") return;
    if (link === "/notifications") return history.push("/notifications", from);
    else if (link === "/order") return history.push("/order", from);
    else if (link === "/ads/order") return history.push("/ads/order", from);
    else if (link === "/media/order") return history.push("/media/order", from);
    else if (link === "/store/order") return history.push("/store/order", from);
    else if (link === "/favorite")
      return history.push("/favorite", {
        ...from,
        position: window.pageYOffset,
      });
    else if (link === "/wallet") return history.push("/wallet", from);
    else if (link === "/q") {
      setOpen(true);
      return;
    }
    history.push(`/setting${link}`, from);
  };
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      {connection ? <ModalConnection /> : null}
      {open ? (
        <AreYouSure open={open} setOpen={setOpen} click={logout} />
      ) : null}
      <Header>
        <ImageBox onClick={() => history.push("/setting/edit", from)}>
          {!image ? (
            <AccountCircleIcon />
          ) : (
            <ErrorImages
              height={100}
              width={100}
              src={image}
              border="1px solid #eee"
              sizeIcon={"2rem"}
            />
          )}
        </ImageBox>
        <Username onClick={() => history.push("/setting/edit", from)}>
          {account.name ? account.name : guestName}
        </Username>
        {!account?.phoneNumber ? (
          <Number></Number>
        ) : (
          <Number onClick={() => history.push("/setting/edit", from)}>
            +{toPersian(account.phoneNumber)}
          </Number>
        )}
      </Header>
      <List>
        {data.map(({ isEnable, Icon, name, link }) => (
          <ItemContainer className="" enabled={isEnable}>
            <ButtonBase style={{ width: "100%" }}>
              <Item
                enabled={isEnable}
                key={name}
                color={!isEnable ? "#969696" : "#313131"}
                onClick={() => handleGo(link)}
              >
                <div>
                  <Icon />
                </div>
                <div>{name}</div>
              </Item>
            </ButtonBase>
          </ItemContainer>
        ))}
      </List>
      <Version>{toPersian("نسخه 0.152")}</Version>
    </Container>
  );
};

export default Setting;
