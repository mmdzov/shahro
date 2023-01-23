import AdsAlert from "components/Ads/AdsAlert";
import AdsDescription from "components/Ads/AdsDescription";
import AdsFeatures from "components/Ads/AdsFeatures";
import AdsReport from "components/Ads/AdsReport";
import AdsSingleSlider from "components/Ads/AdsSingleSlider";
import AdsSubSlider from "components/Ads/AdsSubSlider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { clearSingleAds, getSingleAds } from "store/actions/adsAction";
import AuthAlert from "../../components/Utilities/AuthAlert";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddIcon from "components/Utilities/AddIcon";
import DeleteIcon from "components/Utilities/DeleteIcon";
import EditIcon from "@material-ui/icons/Edit";
import { ProdTitle } from "components/Store/Product.styled";
import AdsSingleCategories from "components/Ads/AdsSingleCategories";
import AreYouSure from "components/Utilities/AreYouSure";
import Delete from "@material-ui/icons/Delete";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import handleApiErrors from "utilities/handleApiErrors";
import adsService from "api/adsService";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { ButtonBase } from "@material-ui/core";
import useLoading from "hooks/useLoading";
import SubSliderLoading from "components/Utilities/Loadings/SubSliderLoading";

const AdsSingle = () => {
  const {
    loading,
    adsSingle: { ads },
    adsSingle,
  } = useSelector(({ ads }) => ads);
  const { alert: notifAlert, loading: mainLoading } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [l, setL] = useState(false);

  const handleCall = () => {
    let ti;
    clearTimeout(ti);
    ti = setTimeout(() => {
      if (loading) return;
      if (ads?.source && ads?.source.includes("http"))
        window.open(ads.source, "_blank");
      else if (ads?.call) {
        if (ads.call.length === 12) window.open(`tel:+${ads.call}`);
        if (ads.call.length === 10) window.open(`tel:0${ads.call}`);
      }
    }, 100);
    // if (ads?.source) return <Redirect to={ads?.source} />;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleAds(token));
    return () => dispatch(clearSingleAds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [sureAlert, setSureAlert] = useState(false);
  const handleDeleteAds = async () => {
    await setSureAlert(false);
    await setL(true);
    dispatch(clearErrMsg());
    try {
      const data = await adsService.deleteSingleAds(token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          if (alert.has === 1) {
            dispatch(
              setAlert({
                show: true,
                mode: "successDeleteAds",
                title: alert.title,
                msg: alert.message,
                has: alert.has,
              })
            );
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              show: true,
              mode: "errorDeleteAds",
              title: e.title,
              msg: e.message,
              has: e.has,
            })
          );
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setL(false);
  };
  const { features } = useSelector(({ ads }) => ads.adsSingle);
  const [highlights] = useState([
    "قیمت",
    "قیمت کل",
    "قیمت هر متر",
    "اجارهٔ ماهانه",
    "ودیعه و اجاره",
    "لینک وب‌سایت",
    "دستمزد",
  ]);
  const { loading: ldng } = useLoading(ads);
  if (mainLoading.mode === "adsToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <AdsContainer>
      {sureAlert ? (
        <AreYouSure
          Icon={Delete}
          open={sureAlert}
          setOpen={setSureAlert}
          click={handleDeleteAds}
          mode="delete"
        />
      ) : null}
      {l ? <ModalConnection /> : null}
      {!loading && adsSingle?.isMe === true ? (
        <DeleteIcon onClick={() => setSureAlert((prev) => !prev)} />
      ) : null}
      {!loading && adsSingle?.isMe === true ? (
        <AddIcon
          Icon={EditIcon}
          style={{ bottom: 60 }}
          to={{
            pathname: `/ads/compose/edit/${ads?.token}`,
            state: { from: "adsSingle" },
          }}
        />
      ) : null}
      <Helmet>
        <title>{ads?.title}</title>
        <meta
          name="description"
          content={ads?.text
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            ?.split(".")
            ?.slice(0, 2)
            ?.join(".")
            .slice(0, 499)}
        ></meta>
        <meta name="keywords" content={ads?.title}></meta>
      </Helmet>
      {notifAlert.mode === "errorDeleteAds" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      {notifAlert.mode === "singleAds" ||
      notifAlert.mode === "successDeleteAds" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
          go={() => history.replace("/ads")}
        />
      ) : null}
      <AdsSingleCategories />
      <Flexible>
        <div className="">
          <AdsSingleSlider />
          <AdsSubSlider />
        </div>
        <FlexItem>
          {loading ? (
            <SubSliderLoading title y="0" />
          ) : (
            <ProdTitle>{ads?.title}</ProdTitle>
          )}
          <AdsFeatures
            highlights={highlights}
            list={features}
            loading={ldng}
            datetime={ads?.datetime}
          />
          <AdsDescription />
          <AdsAlert />
          <AdsReport />
        </FlexItem>
      </Flexible>
      <CallContainer>
        <ButtonBase
          style={{ width: "100%", height: "100%", borderRadius: "100px" }}
          onClick={handleCall}
        >
          {loading ? (
            <Call className="acceptBtnLoading"></Call>
          ) : (
            <Call className="acceptBtn">برقراری تماس</Call>
          )}
        </ButtonBase>
      </CallContainer>
    </AdsContainer>
  );
};
const Flexible = styled.div`
  max-width: 1000px;

  @media (min-width: 640px) {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: 1fr 1fr;
    direction: ltr;
    grid-gap: 10px;
  }
`;
const FlexItem = styled.div`
  @media (max-width: 639px) {
    padding: 0 10px;
  }
  @media (min-width: 640px) {
    direction: rtl;
    margin-right: 8px;
  }
`;
const Call = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 100;
  cursor: pointer;
`;
const CallContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  position: fixed;
  bottom: 5px;
  left: 0;
  padding: 0 10px;
  & .ripple {
    overflow: unset !important;
    width: 100%;
    height: 45px;
  }
`;
const AdsContainer = styled.div`
  margin-bottom: 50px;
  justify-items: center;
  display: grid;
  grid-template-columns: 1fr;
`;
export default AdsSingle;
