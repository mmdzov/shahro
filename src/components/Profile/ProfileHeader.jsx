/* eslint-disable no-unused-vars */
import ErrorImages from "components/Utilities/ErrorImages";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { Header, Head, HeadTitle, Name, BtnContainer } from "./Profile.styled";
import AuthAlert from "../Utilities/AuthAlert";
import { useHistory } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import ProductModal from "components/Store/ProductModal";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import accountService from "api/accountService";
import handleApiErrors from "utilities/handleApiErrors";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import { setProfile } from "store/actions/accountAction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// const ModalStyles = {
//   "@media (max-width: 299px)": {
//     transform: "scale(1.3)",
//   },
//   "@media (min-width: 300px)": {
//     transform: "scale(1.8)",
//   },
//   "@media (min-width: 641px)": {
//     transform: "scale(2.5)",
//   },
//   "@media (min-width: 1007px)": {
//     transform: "scale(3.7)",
//   },
// };

const ProfileHeader = () => {
  const { profile } = useSelector(({ account }) => account);
  const { state } = useLocation();
  const [scale, setScale] = useState("1.8");
  const [width, setWidth] = useState(window.innerWidth);
  function getWidth() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", () => getWidth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  const { alert: notifAlert, guestName } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const [error, setError] = useState(true);
  const imageCallback = (token, err) => {
    setError(err);
  };
  const [large, setLarge] = useState(false);
  const [isGuest, setGuest] = useState(false);
  const viewLargeImage = () => {
    if (error) return;
    setLarge((prev) => !prev);
  };
  useEffect(() => {
    if (width <= 339) setScale("1.1");
    if (width >= 340) setScale("1.8");
    if (width >= 470) setScale("2");
    if (width >= 720) setScale("2");
    if (width >= 1024) setScale("2");
    if (width >= 1320) setScale("3");
  }, [width]);
  const dispatch = useDispatch();
  const [isFollow, setFollow] = useState(profile?.followed === 1);
  useEffect(() => {
    const profileCopy = { ...profile };
    console.log(profile.followed);
    if (profile?.followed === 0) {
      profileCopy.followed = 0;
      dispatch(setProfile(profileCopy));
      setFollow(false);
    } else if (profile?.followed === 1) {
      profileCopy.followed = 1;
      dispatch(setProfile(profileCopy));
      setFollow(true);
    } else {
      setGuest(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    dispatch(clearErrMsg());
    await setLoading(true);
    try {
      let data;
      if (!isFollow) {
        data = await accountService.followUser(profile?.account?.token);
      } else data = await accountService.unfollowUser(profile?.account?.token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          const prof = { ...profile };
          console.log(result);
          prof.followers = result?.followers;
          prof.followings = result?.followings;
          if (prof.followed === 1) prof.followed = 0;
          else prof.followed = 1;
          dispatch(setProfile(prof));
          setFollow((prev) => !prev);
          if (alert.has === 1) {
            dispatch(
              setAlert({
                mode: "followUser",
                show: true,
                title: alert?.title,
                msg: alert?.message,
                has: alert?.has,
              })
            );
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "followUser",
              show: true,
              title: e?.title,
              msg: e?.message,
              has: e?.has,
            })
          );
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setLoading(false);
  };
  const [w, setW] = useState(window?.innerWidth);
  const [h, setH] = useState(window?.innerHeight);
  const [hasScale, setHasScale] = useState(false);
  const handleResizeImg = () => {
    setW(window.innerWidth);
    setH(window.innerHeight);
    // console.log(window.innerWidth, window.innerHeight);
    const profileImg = document.getElementById("profileImg");
    const profileImgSize = profileImg?.getBoundingClientRect();
    console.log(~~profileImgSize?.height, window?.innerHeight);
    if (~~profileImgSize?.height > window.innerHeight) {
      profileImg.parentElement.classList.add("resizeScale");
      profileImg.style.height = window.innerHeight;
      setHasScale(true);
    } else {
      // profileImg.parentElement.classList.remove("resizeScale");
      // if (profileImg && profileImg.style !== null) {
      //   profileImg.style.height = "auto";
      // }
      setHasScale(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", () => handleResizeImg());
    // return () => window.removeEventListener("resize", () => handleResizeImg());
  }, []);
  return (
    <Header>
      {loading ? <ModalConnection /> : null}

      {large ? (
        <ProductModal
          blur={() => setLarge(false)}
          padding="0"
          w={"auto"}
          h={"auto"}
          style={{
            transform: !hasScale && w > 768 ? `scale(${scale})` : "scale(1)",
          }}
        >
          <img
            id="profileImg"
            src={profile?.account?.image}
            onClick={() => setLarge(false)}
            style={{ width: "auto", height: "auto" }}
            alt=""
          />
        </ProductModal>
      ) : null}

      {notifAlert.mode === "profileNotFound" ? (
        <AuthAlert
          alert={{ message: notifAlert?.msg, title: notifAlert?.title }}
          go={() => history.replace("/")}
        />
      ) : null}

      {notifAlert.mode === "followUser" ? (
        <AuthAlert
          alert={{ message: notifAlert?.msg, title: notifAlert?.title }}
        />
      ) : null}

      <Head
        className={"relative"}
        mb={profile?.account?.biography?.length > 0 ? "30px" : "0px"}
      >
        <Name
          className="absolute whitespace-nowrap"
          style={{ bottom: "-17px", fontSize: ".9rem" }}
          onClick={
            profile.isMe
              ? () => history?.push("/setting/edit", { from: "profile" })
              : null
          }
        >
          {profile?.account?.biography}
        </Name>
        {/* <Name
          className="absolute whitespace-nowrap"
          style={{ bottom: "-46px" }}
          onClick={profile.isMe ? () => history.push("/setting/edit",{ from: "profile" }) : null}
        >
          {profile?.account?.name ?? guestName}
        </Name> */}
        <HeadTitle
          onClick={() =>
            history?.push({
              pathname: `/profile/${profile.account.token}/followings`,
              state: { ...state },
            })
          }
        >
          <span>{profile?.followings ?? "0K"}</span>
          <div className="whitespace-nowrap">دنبال میکند</div>
        </HeadTitle>
        <div
          className="flex flex-column align-center cursor-pointer"
          onClick={
            profile.isMe
              ? () => history?.push("/setting/edit", { from: "profile" })
              : () => viewLargeImage()
          }
        >
          <ErrorImages
            person
            cb={imageCallback}
            height={55}
            width={55}
            isError={error}
            src={profile?.account?.image}
          />
        </div>
        <HeadTitle
          onClick={() =>
            history?.push({
              pathname: `/profile/${profile.account.token}/followers`,
              state: { ...state },
            })
          }
        >
          <span>{profile?.followers ?? "0K"}</span>
          <div className="whitespace-nowrap">دنبال کننده</div>
        </HeadTitle>
      </Head>
      <BtnContainer
        style={{
          fontWeight: "bold",
          gridTemplateColumns: profile?.isMe && isGuest ? "1fr 1fr" : "1fr",
        }}
      >
        {profile?.isMe && isGuest ? (
          <ModalBtn
            mode="full"
            width={"100px"}
            lineHeight="27px"
            height="35px"
            margin="0"
            onClick={() => history?.push("/notifications")}
          >
            اعلان ها
          </ModalBtn>
        ) : !isGuest ? (
          <ModalBtn
            mode={isFollow ? "empty" : "full"}
            width={"100px"}
            lineHeight="27px"
            height="35px"
            margin="0"
            onClick={handleFollow}
          >
            {isFollow ? "دنبال نکردن" : "دنبال کردن"}
          </ModalBtn>
        ) : null}
        {/* {profile?.isMe ? (
          <ModalBtn
            width={"100px"}
            onClick={() => history.push("/setting/edit", { from: "profile" })}
            lineHeight="27px"
            margin="0"
            height="35px"
          >
            تغییر پروفایل
          </ModalBtn>
        ) : null} */}
        {profile?.isMe ? (
          <ModalBtn
            className="profileButton"
            background="transparent"
            margin="0"
            width={"100px"}
            onClick={() => history?.push("/setting/edit/", { from: "profile" })}
            lineHeight="27px"
            height="35px"
          >
            ویرایش
          </ModalBtn>
        ) : null}
      </BtnContainer>
    </Header>
  );
};

export default memo(ProfileHeader);
