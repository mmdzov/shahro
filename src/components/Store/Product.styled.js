import Carousel from "nuka-carousel";
import styled from "styled-components";
import GradeIcon from "@material-ui/icons/Grade";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";

export const ProdBuy = styled.div`
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  left: 0px;
`;
export const ProdReportTitle = styled.span`
  color: #d60505;
  font-size: 17px;
`;
export const ProdFavsTitle = styled.div`
  margin-right: 9px;
  font-size: 12px;
  font-weight: 600;
  color: #444444;
`;
export const ProdFavs = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding: 13px 15px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 12px;
  align-items: center;
  justify-content: end;
`;
export const ProdNotComment = styled.div`
  color: #117ab7;
  font-size: 12px;
  font-weight: bold;
  padding-right: 5px;
  padding-left: 13px;
  margin-top: 16px;
  line-height: 22px;
  padding-bottom: 10px;
  text-align: center;
`;
export const ProdSeeMore = styled.div`
  line-height: 15px;
  margin-left: 12px;
  font-size: 11px;
`;
export const ProdCommentHeader = styled.div`
  padding: 15px 0px;
  display: flex;
  justify-content: space-between;
  padding-right: 9px;
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  padding-right: 5px;
`;
export const TwoDot = styled.span`
  font-size: 15px;
`;

// border-top: 1px solid #e0e0e0;
export const ProdSpecSeeMore = styled.div`
  border-top: 1px solid #ded5c2;
  padding: 15px 0px;
  display: flex;
  justify-content: space-between;
  padding-right: 9px;
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  cursor: pointer;
`;
export const ProdSpecItemDesc = styled.div`
  font-size: 12px;
  margin-right: 10px;
  display: inline;
  color: black;
  font-weight: bold;
`;
export const ProdSpecItemTitle = styled.span`
  font-size: 12px;
  color: #232323;
  display: flex;
`;
export const ProdSpecList = styled.div`
  margin-right: 20px;
`;
export const ProdSpecItem = styled.div`
  position: relative;
  display: flex;
  &:not(:last-of-type) {
    padding-bottom: 20px;
  }
  &:last-of-type {
    padding-bottom: 10px;
  }
  &:before {
    content: "";
    width: 7px;
    height: 7px;
    display: inline;
    background: #b3b3b3;
    position: absolute;
    right: -13px;
    top: 8px;
    border-radius: 12px;
  }
`;

export const ProdSpecContainer = styled.div``;
export const ProdColorN = styled.div`
  margin-top: 5px;
  line-height: 15px;
  font-weight: bold;
  margin-right: 4px;
  font-size: 13px;
  width: max-content;
`;
export const ProdColor = styled.div`
  background-color: ${({ color }) => color};
  margin-left: 5px;
  width: 20px;
  height: 20px;
  margin-right: 7px;
  margin-bottom: 0px;
`;
export const ProdColorItem = styled.div`
  display: flex;
  padding: 8px 4px;
  font-size: 13px;
  border-radius: 3px;
  box-shadow: 0px 4px 6px -3px #c3c3c3;
  margin-right: 10px;
  align-items: flex-end;
  height: 40px;
  border: 1px solid #e2e2e2;
  flex-direction: row-reverse;
  cursor: pointer;
`;
export const ProdColorList = styled(Scroll)`
  flex-direction: row-reverse;
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-top: 5px;
  padding-left: 10px;
`;
export const ProdColorName = styled.span`
  margin-right: 5px;
  font-size: 12px;
`;
export const ProdColorContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 12px;
`;
export const ProdTopTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: block;
`;
export const ProdPriceOff = styled.span`
  border-radius: 5px;
  border: 1px solid red;
  color: red;
  display: flex;
  margin-right: 10px;
  width: max-content;
  padding: 0px 5px;
  font-size: 12px;
  line-height: 25px;
  margin-bottom: 3px;
  height: 24px;
`;
export const ProdPrice = styled.div`
  display: block;
  color: #117ab7;
  font-size: 16px;
  font-weight: bold;
  margin-top: 3px;
  white-space: nowrap;
`;
export const ProdPriceContainer = styled.div`
  margin-top: 13px;
`;
export const ProdTitleMuted = styled.div`
  margin-top: 10px;
  font-size: 0.8em;
  color: #737373;
`;
export const Share = styled.div`
  cursor: pointer;
`;
export const ProdRateWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 15px;
`;
export const ProdRateCount = styled.div`
  margin-top: 6px;
  font-size: 13px;
  margin-left: 8px;
  color: #737373;
`;
export const ProdRateContainer = styled.div`
  color: #ccc;
  display: flex;
  flex-direction: row-reverse;
`;
export const Rate = styled.div``;
export const R = styled(GradeIcon)``;
export const ProdPadding = styled.div`
  padding: 0 15px;
`;
export const ProductContainer = styled.div`
  background: #e4e4e4;
  overflow-x: hidden;
`;
export const ProdParent = styled.div`
  background: white;
  margin-bottom: 7px;
  box-shadow: 0px 4px 6px -3px #c3c3c3;
`;
export const ProdSlider = styled(Carousel)`
  height: ${({ h }) => h | "186px;"};
`;
export const ProdSubSlider = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 30px;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  margin-bottom: 5px;
`;
export const Like = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;
export const ProdTitle = styled.h1`
  font-weight: bold;
  font-size: 1.2rem;
  display: block;
`;
