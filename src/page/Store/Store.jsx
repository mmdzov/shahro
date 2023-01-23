import styled from "styled-components";
import StoreMain from "components/Store/StoreMain";
import { useDispatch, useSelector } from "react-redux";
import SlideTempFullLoader from "components/SlideTemp/SlideTempFullLoader";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import StoreOrderBottomSheet from "./StoreOrderBottomSheet";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { setLoading } from "store/actions/_MainAction";

const Store = () => {
  const { loading, products: prods } = useSelector(({ product }) => product);
  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (l.mode === "storeToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <StoreContainer>
      <Helmet>
        <title>فروشگاه - اپلیکیشن شهری میرسه</title>
        <meta name="keywords" content="فروشگاه - اپلیکیشن شهری مرسه"></meta>
      </Helmet>
      {loading ? (
        <Fragment>
          <SlideTempFullLoader />
        </Fragment>
      ) : (
        <Fragment>
          <StoreMain prods={prods} />
        </Fragment>
      )}
      <StoreOrderBottomSheet />
    </StoreContainer>
  );
};
const StoreContainer = styled.div``;

export default Store;
