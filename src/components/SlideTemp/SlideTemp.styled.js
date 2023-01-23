import styled from "styled-components";
import { store } from "../../store/store";
import { Link } from "react-router-dom";

const state = store.getState()._MainReducer.isMobileDevice;
export const Scroll = styled.div`
  scrollbar-width: thin;
  scrollbar-color: #eee;
  &::-webkit-scrollbar {
    height: ${state ? "0px" : "9px"};
  }
  &::-webkit-scrollbar::hover {
    height: ${state ? "0px" : "9px"};
  }
  & div::-webkit-scrollbar {
    height: ${state ? "0px" : "9px"};
  }
  & div::-webkit-scrollbar::hover {
    height: ${state ? "0px" : "9px"};
  }
  /* &::-webkit-scrollbar-track {
    background: #eeee;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #737373;
  } */
`;

export const Price = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: ${({ color }) => color || "#117ab7"};
  width: 100%;
  font-weight: bold;
  text-align: center;
  text-decoration: ${({ decor }) => decor || "none"};
`;

export const Title = styled.div`
  /* white-space: nowrap; */
  font-size: 13px;
  font-weight: bold;
`;
export const ThreeDot = styled.span`
  &:before {
    content: "...";
    position: absolute;
    left: 0px;
    z-index: 1000;
    color: black;
    top: -4px;
    background: white;
    padding: 0 2px;
  }
`;
export const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 10px;
  height: 72px;
  align-items: self-end;
  padding: 0px 5px;
  position: relative;
`;
export const ListImg = styled.img`
  width: 100%;
`;
export const ListContainer = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  margin-bottom: 20px;
`;
export const ListWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`;
export const ListTemp = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`;

export const ListItemContainer = styled.div`
  border: 10px solid transparent;
  border-top: 0;
  /* ${({ isSpecial }) =>
    isSpecial
      ? `
  padding-right: 22%;
  `
      : ""} */
  &:not(:last-of-type) {
    border-left: 0;
  }
  &:last-of-type {
    margin-left: 10px;
  }
  ${({ borderRight }) =>
    borderRight
      ? `
  border-right: ${borderRight} !important;
  `
      : ""}
`;

export const ListItem = styled(Link)`
  margin-right: 10px;
  width: ${({ w }) => w || "165px"} !important;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  border-radius: 6px;
  cursor: pointer;
  border: ${({ borderunset }) => borderunset || "1px solid #eee"};
  box-shadow: 0px 4px 6px -3px rgba(160, 160, 160, 0, 24);
  margin: 0 5px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
`;
export const Image = styled.div`
  position: relative;
  height: ${({ h }) => (h ? "151px !important" : "auto")};
  &.activeAds {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 28px;

    & > div {
      height: 108px !important;
      border-radius: 5px;
    }
  }
`;
export const ErrImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
