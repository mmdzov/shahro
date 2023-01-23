import styled from "styled-components";
import { Link } from "react-router-dom";

export const FaresListItem = styled.div``;
export const FaresItemContainer = styled(Link)`
  width: 240px;
  height: 340px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
export const FaresItem = styled.div`
  height: 100%;
  width: 100%;
  margin: ${({ margin }) => (margin ? "0 5px" : "0")};
  overflow: hidden;
  background: white;
  box-shadow: 0 5px 10px -3px #dedede;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0px;
  /* padding-bottom: 10px; */
  &.hasHomeFareItem {
    width: 100%;
    margin: 0 !important;
  }
`;

export const ErrorImg = styled.img`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: white;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    background: white;
  }
`;
export const FaresItemHeader = styled.div`
  padding: 0px 25px;
  font-size: 0.8rem;
  /* white-space: nowrap; */
  height: 83px;
  padding-top: 12px;
  .fareTitle {
    font-weight: bold;
    font-size: 1rem;
    max-height: 45px;
    overflow: hidden;
  }
  .fareLocation {
    margin-top: 3px;
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

export const FaresItemBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 17px;
  font-size: 0.8rem;
  margin-top: ${({ mt }) => (mt ? "10px" : "15px")};
  padding-bottom: 10px;
  font-size: 0.7rem;
  align-items: center;

  .seeMoreBtn {
    background: #0886e0;
    color: white;
    border-radius: 100px;
    padding: 5px 15px;
    font-weight: bold;
    cursor: pointer;
  }
  .reserve {
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 5px 15px;
    font-weight: bold;
    align-items: center;
  }
`;

export const FareConainer = styled.div`
  .Calendar {
    min-height: 25.7em !important;
  }
  .Calendar__sectionWrapper {
    min-height: 21.8em !important;
  }
  .Calendar__header {
    padding-top: 10px !important;
    padding-bottom: 15px !important;
  }
`;

export const FareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;

  & .titleHeader {
    font-weight: 600;
    font-size: 1.1rem;
  }
  & .user {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .userImage {
    width: 40px;
    height: 40px;
    border-radius: 100px;
    overflow: hidden;
    position: relative;
    & > img {
      width: inherit;
      height: inherit;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      width: 42px;
      height: 42px;
      border: 4px solid #fffbf7;
    }
  }
`;
export const FareMain = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    direction: ltr;
    .content {
      margin-top: 0 !important;
    }
  }
`;
export const FareContent = styled.div`
  /* margin-top: 30px; */
  padding: 0 15px;
  direction: rtl;
  & .title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #4d4d4d;
    margin-bottom: 16px;
  }
  .calendarPicker {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 10px 0px;
    padding: 0 10px;
    box-shadow: 0px 4px 12px -6px #ccc;
    font-size: 0.8rem;
    font-weight: 600;
    color: #656565;
    background: white;
    cursor: pointer;
    z-index: 999;
  }
`;

export const Submit = styled.button`
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-weight: 500;
  z-index: 9999999999;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 5px;
  font-weight: 600;
  font-size: 1rem;
  &:not(:first-of-type) {
    margin-top: 5px;
  }
`;

export const AlertMsg = styled.div`
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;
