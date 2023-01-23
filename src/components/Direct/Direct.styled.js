import styled from "styled-components";

export const DirectHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  position: fixed;
  background: white;
  width: 100%;
  z-index: 99999;
  /* border-bottom: 1px solid #eee; */
  top: 0;
  transition: all 0.2s ease-out;
`;
export const DirectList = styled.div`
  margin-top: 56px;
`;
export const DirectHeaderInput = styled.input`
  width: 100%;
  height: 35px;
  margin: 0 8px;
  padding: 0 7px;
  border-radius: 100px;
  margin-left: 0;
  font-size: 0.9rem;
  background: #f3f3f3;
  color: #676767;
  padding-right: 12px;
  overflow: hidden;
`;
export const SearchIcon = styled.div`
  position: absolute;
  left: 5px;
  top: 0px;
  width: 30px;
  height: 35px;
  line-height: 35px;
  & > svg {
    color: #b1afaf;
  }
`;

export const DirectItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  overflow: hidden;
  align-items: center;
  padding: 10px 7px;
  border-bottom: 1px solid #eaeaea;
`;

export const Username = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Message = styled.div`
  max-height: 23px;
  line-height: 27px;
  font-size: 0.8rem;
`;

export const NewMessage = styled.div`
  background: #14c311;
  color: white;
  border-radius: 100px;
  font-size: 0.9rem;
  text-align: center;
  height: 28px;
  line-height: 33px;
  width: 28px;
`;
