import EmptyBasket from "components/Basket/EmptyBasket";
import StoreOrderList from "components/StoreOrder/StoreOrderList";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import useLastPosition from "hooks/useLastPosition";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getMyProducts } from "store/actions/productAction";
import styled from "styled-components";
import StoreOrderBottomSheet from "../Store/StoreOrderBottomSheet";

const StoreOrder = () => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { myProducts, lastProductPosition } = useSelector(
    ({ product }) => product
  );
  const [loading, setLoading] = useState(true);
  const r = useRef(null);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getMyProducts());
    await setLoading(false);
  };
  useLastPosition(lastProductPosition);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!myProducts || myProducts.length === 0) {
      getDatas();
    } else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container ref={r}>
      <Helmet>
        <title>محصولات من - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"محصولات من - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      {notifAlert.mode === "myProducts" ||
      notifAlert.mode === "myProductsError" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
        />
      ) : null}
      {!myProducts || myProducts?.length === 0 ? (
        <EmptyBasket title="بدون محصول" msg="درحال حاظر محصولی ثبت نکردید" />
      ) : (
        <StoreOrderList />
      )}
      <StoreOrderBottomSheet />
    </Container>
  );
};

const Container = styled.div``;

export default StoreOrder;
