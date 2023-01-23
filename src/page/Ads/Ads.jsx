/* eslint-disable react-hooks/exhaustive-deps */
import AdsTopCats from "components/Ads/AdsTopCats";
import AdsListItems from "components/Ads/AdsListItems";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, setAdsData, setPage } from "store/actions/adsAction";
import styled from "styled-components";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { Helmet } from "react-helmet";
import AddIcon from "components/Utilities/AddIcon";
import { useContext } from "react";
import AdsContext from "context/AdsContext";
import { useHistory, useLocation, useParams } from "react-router-dom";
import EmptyBasket from "components/Basket/EmptyBasket";
import { setLoading as setL } from "store/actions/_MainAction";

const Ads = () => {
  const { page, ads, adsCategory } = useSelector(({ ads }) => ads);
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  const { adsId } = useParams();
  const { loading: loading1 } = useContext(AdsContext);
  const dispatch = useDispatch();
  const ad = useRef(null);
  const [f, setF] = useInfiniteScroll();
  const [loading, setLoading] = useState(false);
  const { pathname, state } = useLocation();
  const history = useHistory();

  const checkCatHasNull = async () => {
    await setLoading(true);
    if (adsId === "null") {
      history.replace("/ads");
    }
    await setLoading(false);
  };

  useEffect(() => {
    checkCatHasNull();
  }, [adsId]);
  const updateAds = async () => {
    await setLoading(true);
    await dispatch(setPage(page + 1));
    if (adsId) {
      await dispatch(getAds(setLoading, adsId));
    } else {
      await dispatch(getAds(setLoading));
    }
    await setF(false);
    await setLoading(false);
  };
  useEffect(() => {
    if (ads?.length > 0) {
      const hasAds = pathname
        .split("/")
        .filter((item) => item)
        .every((item) => item === "ads");
      console.log(
        pathname
          .split("/")
          .filter((item) => item)
          .every((item) => item === "ads"),
        hasAds,
        state
      );

      if (hasAds) {
        if (state?.lastPosition) {
          window.scrollTo(0, state?.lastPosition);
        }
      }
    }
  }, [state, pathname, ads]);

  useEffect(() => {
    return () => {
      if (pathname.includes("filter") && adsId) dispatch(setAdsData());
    };
  }, [adsId]);

  useEffect(() => {
    if (page < 0) return;
    if (f) updateAds();
  }, [f, setF]);

  const { allowToCreate } = useSelector(({ ads }) => ads);
  useEffect(() => {
    dispatch(setL());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading1 || l.mode === "adsToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <AdsContaienr ref={ad} style={{ background: "transparent" }}>
      {adsId ? (
        <Helmet>
          <title>آگهی های {`${adsCategory?.name}`} - اپلیکیشن شهری میرسه</title>
          <meta
            name="keywords"
            content={`آگهی های ${adsCategory?.name} - اپلیکیشن شهری میرسه`}
          ></meta>
        </Helmet>
      ) : (
        <Helmet>
          <title>آگهی و خرید و فروش جنس دست دوم - اپلیکیشن شهری میرسه</title>
          <meta
            name="keywords"
            content={"آگهی و خرید و فروش جنس دست دوم - اپلیکیشن شهری میرسه"}
          ></meta>
        </Helmet>
      )}
      <AdsTopCats />
      {!loading &&
      adsId &&
      pathname.includes("filter") &&
      !loading &&
      (!ads || ads?.length === 0) ? (
        <EmptyBasket
          title=" "
          msg="هیچ اگهی ای در حال حاظر در این دسته موجود نیست"
        />
      ) : null}
      <AdsListItems />
      {/* <Cats to="/ads/categories">
        <DoneIcon />
      </Cats> */}
      {allowToCreate === 1 ? <AddIcon to="/ads/compose" mode="link" /> : null}
      <div style={{ marginTop: 15 }}>
        {loading ? (
          <DotLoading>
            <LodingDotPlus isRelative={false} />
          </DotLoading>
        ) : null}
      </div>
    </AdsContaienr>
  );
};

const DotLoading = styled.div`
  position: relative;
`;
const AdsContaienr = styled.div`
  overflow-x: hidden;
  padding-bottom: 30px;
`;
export default Ads;
