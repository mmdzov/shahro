import styled from "styled-components";
import { Link } from "react-router-dom";

export const ItemContainer = styled.div`
  background: white;
  padding: 10px 10px;
  margin-bottom: 6px;
  box-shadow: 0 5px 7px 0px #eee;
`;

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  height: 35px;
  & > div:first-of-type {
    color: #8f8f8f;
    font-size: 0.9rem;
    font-weight: 600;
  }
  & > div:last-of-type {
    font-size: 0.8rem;
    margin-right: 7px;
    font-weight: 600;
    max-height: 35px;
    word-break: break-all;
    overflow: hidden;
    color: ${({ color }) => (color ? color : "black")};
  }
`;

export const ListContainer = styled.div`
  background: white;
  padding-bottom: 10px;
  margin-bottom: 6px;
  box-shadow: 0 5px 7px 0px #eee;
`;

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 10px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
  }
`;
export const ProductItemLink = styled(Link)`
  display: grid;
  cursor: pointer;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 10px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
  }
`;
