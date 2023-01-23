import { Fragment, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProdParent } from "./Product.styled";
import StoreSlideList from "./StoreSlideList";
import styled from "styled-components";
import useForceUpdate from "hooks/useForceUpdate";
import SlideTempFullLoader from "components/SlideTemp/SlideTempFullLoader";

const ProductSimilar = () => {
  const {
    single: { product: prod },
  } = useSelector(({ product }) => product);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    let si;
    if (prod && Object.keys(prod).length > 0) {
      si = setTimeout(() => {
        forceUpdate();
      }, 5000);
    }
    return () => clearTimeout(si);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);

  return (
    <Fragment>
      {prod?.relateds ? (
        <PrdPrnt style={{ marginBottom: "60px", overflow: "hidden" }}>
          <div style={{ padding: "15px 5px", fontWeight: "bold" }}>
            محصولات مشابه
          </div>
          <StoreSlideList list={prod?.relateds} />
        </PrdPrnt>
      ) : (
        <PrdPrnt style={{ paddingTop: 15, paddingBottom: 0, marginBottom: 60 }}>
          <SlideTempFullLoader itemc={5} listc={1} />
        </PrdPrnt>
      )}
    </Fragment>
  );
};

const PrdPrnt = styled(ProdParent)`
  @media (min-height: 1054px) {
    margin-bottom: 130px !important;
  }
`;

export default memo(ProductSimilar);
