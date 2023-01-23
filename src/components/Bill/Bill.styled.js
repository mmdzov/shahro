import styled from "styled-components";

export const Container = styled.div``;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding-top: 30px;
`;
export const Input = styled.input`
  height: 55px;
  padding: 10px;
  border: 2px solid #e4e4e4;
  border-radius: 5px;
  width: inherit;
  box-sizing: border-box;
  font-size: 0.9rem;
  &:focus {
    border: ${({ focusBorder }) => focusBorder || "2px solid #00adff"};
  }
`;
export const TextArea = styled.textarea`
  height: 100px;
  padding: 10px;
  border: 2px solid #e4e4e4;
  border-radius: 5px;
  width: inherit;
  resize: none;
  box-sizing: border-box;
  font-size: 0.9rem;
  &:focus {
    border: ${({ focusBorder }) => focusBorder || "2px solid #00adff"};
  }
`;

export const RedirectText = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  bottom: 190px;
  font-size: 1rem;
  font-weight: 600;
`;
export const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: white;
  z-index: 9999;
  top: 0px;
`;
export const FormContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
`;
export const AlertMsg = styled.div`
  color: #dc3e3e;
  font-size: 0.8rem;
  margin-top: 6px;
  margin-right: 6px;
  font-weight: 600;
`;
export const InputContainer = styled.div`
  width: 100%;
  height: 92px;
  padding: 0 12px;
  position: relative;
  & > label {
    position: absolute;
    line-height: 55px;
    right: 21px;
    font-size: 0.9rem;
    color: #a0a0a0;
    pointer-events: none;
  }
`;
export const Title = styled.div`
  padding: 0 16px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #6b6b6b;
`;
export const Btn = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
