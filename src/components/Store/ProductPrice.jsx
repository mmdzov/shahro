import discount from "utilities/discount";
import toToman from "utilities/toToman";
import {
  ProdPrice,
  ProdPriceContainer,
  ProdPriceOff,
  ProdTopTitle,
  TwoDot,
} from "./Product.styled";
import styled from "styled-components";
import { Fragment } from "react";
import useLoading from "hooks/useLoading";
import ProductPriceTemp from "components/SlideTemp/ProductPriceTemp";
const ProductPrice = ({ prod }) => {
  const { loading } = useLoading(prod);
  if (loading) return <ProductPriceTemp />;
  return (
    <ProdPriceContainer>
      <PriceWrapper>
        <ProdTopTitle>
          قیمت<TwoDot>:</TwoDot>{" "}
        </ProdTopTitle>
        {prod?.inStock === -1 && prod?.off ? (
          <ProdPriceOff>{discount(prod?.price, prod?.off).fa}</ProdPriceOff>
        ) : null}
      </PriceWrapper>
      <PriceGroup>
        {prod?.inStock !== 0 ? (
          prod?.off ? (
            <Fragment>
              <ProdPrice>{toToman(prod?.off)}</ProdPrice>
              <ProdPrice
                style={{
                  textDecoration: "line-through",
                  color: "red",
                  marginRight: 15,
                }}
              >
                {toToman(prod?.price)}
              </ProdPrice>
            </Fragment>
          ) : (
            <ProdPrice>{toToman(prod?.price)}</ProdPrice>
          )
        ) : (
          <div>ناموجود</div>
        )}
      </PriceGroup>
    </ProdPriceContainer>
  );
};
const PriceGroup = styled.div`
  display: flex;
`;
const PriceWrapper = styled.div`
  display: flex;
  height: 30px;
  align-items: flex-end;
`;
export default ProductPrice;
