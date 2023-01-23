import AdsList from "components/Ads/AdsList";
import SlideTemp from "components/SlideTemp/SlideTemp";
import { useSelector } from "react-redux";
import { memo } from "react";

const HomeAds = () => {
  const { homeAds, loading } = useSelector(({ ads }) => ads);
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <SlideTemp
      title="آگهی ها"
      path="/ads"
      data={homeAds}
      isBorderTop={false}
      isMarginTop
      marginBottom={10}
      loading={loading || l.mode === "homeLoading"}
      // paddingBottom="30px"
    >
      <AdsList list={homeAds} />
    </SlideTemp>
  );
};

export default memo(HomeAds);
