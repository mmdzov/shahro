import styled from "styled-components";

export const Container = styled.div``;
export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 150px;
`;
export const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  cursor: pointer;
  & > svg {
    font-size: 7rem;
    margin-top: -6px;
    margin-right: -6px;
    color: #bdbdbd;
  }
`;
export const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 100px;
`;

export const Username = styled.div`
  margin-top: 28px;
  font-size: 1.3rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
`;
export const Number = styled.div`
  direction: ltr;
  margin-top: 5px;
  font-size: 0.9rem;
  color: #0583dc;
  font-weight: 600;
  letter-spacing: 1px;
  height: 20px;
`;

export const List = styled.div`
  margin-top: 20px;
`;
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
  &:hover {
    background-color: ${({ enabled }) => (enabled ? "#f3f3f3" : "transparent")};
  }
`;
export const Item = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${({ enabled }) => (enabled ? "pointer" : "unset")};

  & > div:first-of-type {
    padding: 0 18px;
    & > svg {
      color: ${({ color }) => color || "black"};
    }
  }
  & > div:last-of-type {
    color: ${({ color }) => color || "black"};
  }
`;

export const Version = styled.div`
  margin: 15px 0px;
  margin-bottom: 0px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

export const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 130px;
  background: #008eff;
  color: white;
`;
export const ModalQuestion = styled.div`
  margin-top: 124px;
  text-align: center;
  font-size: 0.9rem;
  padding: 10px 3px;
  color: #404040;
  font-weight: 600;
`;
