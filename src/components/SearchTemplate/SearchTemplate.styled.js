import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 100fr 1fr;
  padding: 0 10px;
  height: 60px;
  padding-top: 10px;
  margin-bottom: 10px;

  & > input {
    border: 2px solid #eee;
    border-radius: 6px;
    padding: 0 10px;
  }

  & > div {
    width: 50px;
  }
  & button {
    width: 50px;
    height: 100%;
    overflow: hidden;
    color: #a4a4a4;
  }
`;
