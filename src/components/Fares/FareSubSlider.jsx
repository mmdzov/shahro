/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Like, ProdSubSlider, Share } from "../Store/Product.styled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import useLoading from "hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AuthAlert from "components/Utilities/AuthAlert";
import toPersian from "utilities/ToPersian";
import SubSliderLoading from "components/Utilities/Loadings/SubSliderLoading";
import adsService from "api/adsService";
import handleApiErrors from "utilities/handleApiErrors";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import { setSingleAds } from "store/actions/adsAction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import fareService from "api/fareService";
import { setFare } from "store/actions/fareAction";
const FareSubSlider = () => {
  const {
    fare: { likeMe, like: likedCount },
    fare,
  } = useSelector(({ fare }) => fare);
  const [like, setLike] = useState(likeMe);
  const { loading } = useLoading(fare);
  const [liked, setLiked] = useState(likedCount);
  const [isCopy, setCopy] = useState(false);

  useEffect(() => {
    setLiked(likedCount);
    if (likeMe === 1) {
      setLike(true);
    } else if (likeMe === 0) {
      setLike(false);
    }
  }, [likeMe, likedCount]);
  // useEffect(() => {
  //   if (!like) {
  //     setLiked((prev) => prev - 1);
  //   } else {
  //     setLiked((prev) => prev + 1);
  //   }
  // }, [like, likedCount]);

  const handleShare = () => {
    let inp = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(inp);
    inp.value = text;
    inp.select();
    document.execCommand("copy");
    document.body.removeChild(inp);
    setCopy(true);
  };
  const { token } = useParams();
  const dispatch = useDispatch();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const onLike = async () => {
    dispatch(clearErrMsg());
    setLike((prev) => !prev);
    const rentInstance = { ...fare };
    if (rentInstance.likeMe === 1) {
      rentInstance.likeMe = 0;
      rentInstance.like -= 1;
    } else if (rentInstance.likeMe === 0) {
      rentInstance.likeMe = 1;
      rentInstance.like += 1;
    }
    dispatch(setFare(rentInstance));
    try {
      const data = await fareService.fareLike(token, like ? 0 : 1);
      handleApiErrors(data)
        .then(({ alert }) => {
          if (alert.has === 1) {
            dispatch(
              setAlert({
                show: true,
                mode: "FareLike",
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
              show: true,
              mode: "FareLike",
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
  };
  if (loading) return <SubSliderLoading />;
  return (
    <Fragment>
      {isCopy ? (
        <AuthAlert
          alert={{ title: " ", message: "کرایه با موفقیت کپی شد" }}
          go={() => setCopy(false)}
        />
      ) : null}
      {notifAlert.mode === "FareLike" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <SubSlider>
        <LikeContainer className="">
          <Like
            style={{ color: like ? "red" : "gray", marginRight: 0 }}
            onClick={onLike}
          >
            {!like ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </Like>
          <span style={{ lineHeight: "17px", marginLeft: 5 }}>
            {liked > 0 ? toPersian(liked + "") : null}
          </span>
        </LikeContainer>
        <Share onClick={handleShare}>
          <ShareIcon />
        </Share>
      </SubSlider>
    </Fragment>
  );
};

const LikeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
`;
const SubSlider = styled(ProdSubSlider)`
  margin-top: 23px;
  direction: ltr;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  @media (max-width: 639px) {
    padding: 10px 15px;
  }
  @media (min-width: 640px) {
    padding: 0px 10px;
  }
`;
export default FareSubSlider;
