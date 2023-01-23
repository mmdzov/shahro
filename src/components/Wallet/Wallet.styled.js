import styled from "styled-components";

export const Container = styled.div`
  margin-top: 83px;
`;

export const List = styled.div``;

export const Item = styled.div`
  margin: 0 15px;
  padding: 5px 12px;
  box-shadow: 0px 3px 6px 0px #e4e4e4;
  border-radius: 7px;
  margin-bottom: 12px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
`;

export const Label = styled.span`
  color: #353535;
  font-size: 0.9rem;
  margin-left: 10px;
`;

export const Price = styled.div`
  font-size: 1.1rem;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
`;

export const Time = styled.div`
  font-size: 0.8rem;
  color: #7b7b7b;
  font-weight: 600;
`;

export const Row1Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 5px;
  align-items: center;
`;

export const Plus = styled.span`
  margin-right: 2px;
  margin-left: 5px;
  padding-top: 3px;
  font-size: 0.9rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  /* grid-template-columns: repeat (2, 91%); */
  height: 45px;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
  direction: rtl;
  & > div:first-of-type {
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const ModalForm = styled.form`
  padding: 20px;
  direction: rtl;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & > input {
    height: 30px;
    margin-top: 10px;
    margin-bottom: 3px;
    border-bottom: 2px solid ${({ invalid }) => (invalid ? "red" : "#008eff")};
  }
  & > label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #5d5d5d;
  }
`;

export const ModalClose = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  margin-left: 20px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 3px;
  cursor: pointer;
`;

export const ModalTitle = styled.div`
  padding: 10px 0px;
  padding-bottom: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
`;

export const ModalSubtitle = styled.div`
  font-size: 0.7rem;
  padding-top: 15px;
  font-weight: 600;
  text-align: justify;
  line-height: 17px;
`;

export const InvalidPrice = styled.span`
  color: #ff4e4e;
  font-size: 0.7rem;
  margin-right: 6px;
  white-space: nowrap;
  font-weight: bold;
`;
