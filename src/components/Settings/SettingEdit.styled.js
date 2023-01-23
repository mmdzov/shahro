import styled from "styled-components";
import { Container as Cont } from "./Setting.styled";

export const ImageContainer = styled.div`
  position: relative;
  height: 100px;
  cursor: pointer;
`;
export const Container = styled(Cont)`
  padding-bottom: 65px;
`;
export const PlusIcon = styled.div`
  position: absolute;
  bottom: -12px;
  right: -9px;
  color: #848484;

  & > svg {
    font-size: 2.3rem;
  }
`;

export const Submit = styled.button`
  color: white;
  width: 45px;
  height: 45px;
  background-color: #00adff;
  border-radius: 100px;
  & > svg {
  }
`;

export const RangeContainer = styled.div`
  padding: 0px 27px;
  margin-top: 20px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
`;

export const SubmitContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
`;

export const ImageForm = styled.form`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: pointer;

  & > input {
    height: inherit;
    width: inherit;
    opacity: 0;
    cursor: pointer;
  }
`;
