import { ButtonBase } from "@material-ui/core";
import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 50px;
  align-items: center;
  color: #313131;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  flex-direction: row-reverse;
  position: fixed;
  top: 42px;
  z-index: 9;
`;

export const TabItem = styled(ButtonBase)`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  /* &:not(:last-of-type) {
    border-right: 1px solid #d4d4d4;
  } */
  &.tabItem.active {
    color: black;
    background: #eee;
  }
`;
