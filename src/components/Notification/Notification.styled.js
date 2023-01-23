import styled from "styled-components";

export const Container = styled.div``;
export const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 5px 10px;
  box-shadow: 0 4px 6px -2px #ccc;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CenterItem = styled.div`
  display: grid;
  font-size: 0.9rem;
  padding: 0 10px;
  & > span:first-of-type {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  & > span:last-of-type {
    font-size: 0.7rem;
    font-weight: 500;
    color: #4a4a4a;
    max-height: 34px;
    overflow: hidden;
  }
`;
export const Icons = styled.div`
  display: flex;
  margin-top: 5px;
  color: #888;
`;

export const Icon = styled.div`
  margin: 0 1px;
  & > svg {
    font-size: 1.1rem !important;
  }
`;

export const LeftItem = styled.div`
  height: 100%;
  font-size: 0.8rem;
  padding-right: 5px;
  width: 65px;
  text-align: center;
`;

export const Muted = styled.div`
  color: #797979;
`;

export const Follow = styled.div`
  color: #0f6cf7;
`;
