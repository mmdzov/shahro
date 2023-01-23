import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setInFeature, setSingleProduct } from "store/actions/productAction";
import useLoading from "hooks/useLoading";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";

const ProductFeatures = () => {
  const { token } = useParams();
  const {
    single: { product: prod },
    inFeature: { ftr, title },
  } = useSelector(({ product }) => product);
  const dispatch = useDispatch();
  const { loading } = useLoading(prod);
  const getProduct = async () => {
    if (!ftr) await dispatch(setSingleProduct(token));
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
    getProduct();
    // if (!ftr) history.replace("/store");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!ftr) {
      dispatch(setInFeature({ ftr: prod?.features, title: prod?.title }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  return (
    <div>
      <div>
        {loading ? (
          <LodingDotPlus isRelative={false} isFixed />
        ) : (
          <>
            <Title>{title}</Title>
            <Ftrs>
              {ftr?.map(({ name, value }) => (
                <Grid key={name}>
                  <NameItem>
                    {name}
                    <TwoDot>:</TwoDot>
                  </NameItem>
                  <PriceItem>{value.toLocaleString("fa-IR")}</PriceItem>
                </Grid>
              ))}
            </Ftrs>
          </>
        )}
      </div>
    </div>
  );
};
const PriceItem = styled.div`
  font-weight: bold;
`;
const TwoDot = styled.span`
  font-size: 13px;
  margin: 0 5px;
`;
const NameItem = styled.div`
  padding-left: 37px;
  font-size: 15px;
  font-weight: bold;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  margin-bottom: 29px;
  align-items: center;
`;
const Ftrs = styled.div`
  padding: 0 15px;
  margin-top: 10px;
`;
const Title = styled.div`
  text-align: center;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
export default ProductFeatures;
