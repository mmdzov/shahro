import AdsOrderList from "components/AdsOrder/AdsOrderList";
import EmptyBasket from "components/Basket/EmptyBasket";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdsOrder } from "store/actions/adsAction";
import styled from "styled-components";
import AddIcon from "components/Utilities/AddIcon";
import { Helmet } from "react-helmet";

const AdsOrder = () => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { order } = useSelector(({ ads }) => ads);
  const [loading, setLoading] = useState(true);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getAdsOrder());
    await setLoading(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { allowToCreate } = useSelector(({ ads }) => ads);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      <Helmet>
        <title>آگهی های من - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"آگهی های من - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      {notifAlert.mode === "adsOrder" || notifAlert.mode === "adsOrderError" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
        />
      ) : null}
      {allowToCreate === 1 ? <AddIcon to="/ads/compose" /> : null}
      {order?.length === 0 ? (
        <EmptyBasket title="بدون آگهی" msg="درحال حاظر آگهی ندارید" />
      ) : (
        <AdsOrderList />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default AdsOrder;
