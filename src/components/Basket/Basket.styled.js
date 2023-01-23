import styled from "styled-components";

export const EmptyBasketDescription = styled.div`
  font-size: 0.8rem;
  margin-top: 10px;
  font-weight: 600;
  color: #616161;
`;
export const EmptyBasketTitle = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
`;
export const EmptyBasketIcon = styled.div`
  & > svg {
    font-size: 97px;
    color: #9a9a9a;
  }
`;
export const EmptyBasketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  border-top: 1px solid #ccc;
  justify-content: center;
  // top: 0;
  padding-bottom: 110px;
  overflow: hidden;
`;
export const ProdListContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ProdList = styled.div`
  height: auto;
  position: absolute;
  margin-top: 48px;
  padding-bottom: 65px;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
  @media (min-width: 850px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
  }
`;

export const ProdCounter = styled.div`
  display: flex;
  width: 115px;
  justify-content: space-between;
`;
export const ProdCount = styled.div`
  margin-top: 3px;
  font-weight: 400;
  font-size: 14px;
`;
export const ProdItemFlex = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 3px;
  align-items: center;
`;
export const ProdItemCount = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  &:before {
    content: "تعداد";
    position: absolute;
    right: 5px;
    top: -14px;
    font-size: 12px;
  }
`;
export const ProdItemTitle = styled.div`
  border-bottom: 1px solid gainsboro;
  font-size: 13px;
  font-weight: 600;
  padding: 3px 5px;
`;
export const ProdItemRight = styled.div`
  padding: 5px 0px;
`;
export const ProdItemLeft = styled.div`
  width: 100px;
  height: 100px;
  & > img {
    width: inherit;
    height: inherit;
  }
`;
export const ProdItemHeader = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 2fr 1fr;
  padding: 0 10px;
  justify-items: center;
`;
export const ProdItem = styled.div`
  width: 100%;
  background-color: white;
  border-top: 1px solid #e4e4e4;
  box-shadow: 0px 4px 6px -3px #b5b5b5;
  padding: 8px 4px;
  margin-top: 10px;
`;
export const TotalPrice = styled.div`
  color: #117ab7;
  font-weight: 600;
  font-size: 13px;
`;
export const TotalPurchase = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: bold;
  position: fixed;
  width: 100%;
  background-color: rgb(245 244 244);
  border-top: 1px solid #ccc;
  z-index: 1000;
  padding-left: 10px;
`;
export const BasketContainer = styled.div`
  padding-bottom: 10px;
  background: rgb(245 244 244);
  height: 100%;
`;
export const Price = styled(TotalPrice)`
  text-align: center;
`;
