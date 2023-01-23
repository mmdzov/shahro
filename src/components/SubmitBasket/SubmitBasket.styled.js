import styled from "styled-components";

export const Container = styled.div`
  box-shadow: 0 0 8px 0px #d6d6d6;
  width: 100%;
  padding: 10px 5px;
  margin-bottom: 5px;
`;
export const Title = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
  margin-right: 5px;
`;

export const Btn = styled.div`
  color: #08c508;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const InsetLayout = styled.div`
  padding: 0 10px;
`;

export const ModalTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding: 0 10px;
`;

export const ModalBtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  & > div {
    width: 90%;
    height: 44px;
    line-height: 36px;
  }
`;

export const Invalid = styled.div`
  margin-top: -8px;
  margin-right: 5px;
  font-size: 0.8rem;
  color: #da1b1b;
  font-weight: 600;
`;

export const More = styled.div`
  color: #008eff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0 15px;
  cursor: pointer;
  margin-bottom: 25px;
`;
export const DiscountCodeForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const BasketDetailItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: center;
  height: 30px;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #484848;
  & > div {
    width: 100%;
    text-align: left;
  }
`;

export const DiscountPrice = styled.div`
  color: #c10303;
  text-decoration: line-through;
  margin-right: 10px;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
