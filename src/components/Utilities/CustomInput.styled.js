const { default: styled } = require("styled-components");

export const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
  display: flex;
  margin-right: -3px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`;

export const Input = styled.input`
  height: 35px;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  margin: 7px 5px;
  /* transition: all 0.3s ease-in-out; */
`;

export const Textarea = styled.textarea`
  margin-top: 5px;
  padding: 5px;
  height: 77px;
  border-radius: 5px;
  height: 100px;
  margin: 7px 5px;
  resize: none;
  outline: none;
  /* transition: all 0.3s ease-in-out; */
`;

export const Select = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 50px;
  align-items: center;
  margin: 0 6px;
  cursor: pointer;
`;
