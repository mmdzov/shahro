import ProductModal from "./ProductModal";
import styled from "styled-components";
import CustomInput from "components/Utilities/CustomInput";
import { useState } from "react";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
const ReportTemplate = ({ onCancel, onSubmit }) => {
  const [state, setState] = useState({
    title: { text: "", isValid: true },
    description: { text: "", isValid: true },
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: { text: value, isValid: true } }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title: { text: TT },
      description: { text: TD },
    } = state;
    if (TT?.length < 3)
      return setState((prev) => ({
        ...prev,
        title: { ...prev.title, isValid: false },
      }));
    else if (TD?.length < 5)
      return setState((prev) => ({
        ...prev,
        description: { ...prev.description, isValid: false },
      }));
    setState((prev) => ({
      ...prev,
      title: { ...prev.title, isValid: true },
      description: { ...prev.description, isValid: true },
    }));
    onSubmit(state);
  };

  return (
    <ProductModal>
      <Form onSubmit={(e) => e?.preventDefault()}>
        <div style={{ height: 100 }}>
          <Input
            fontSize="17px"
            marginRight="3px"
            label="موضوع"
            style={{ height: 45 }}
            mode="group"
            type="input"
            onChange={handleChange}
            name="title"
          />
          {!state.title.isValid ? (
            <Error>توجه : حداقل سه حرف وارد کنید!</Error>
          ) : null}
        </div>
        <div style={{ height: 140 }}>
          <Input
            fontSize="17px"
            marginRight="3px"
            label="توضیح"
            mode="group"
            style={{ height: 95 }}
            type="textarea"
            onChange={handleChange}
            name="description"
          />
          {!state.description.isValid ? (
            <Error>توجه : حداقل پنج حرف وارد کنید!</Error>
          ) : null}
        </div>
        <ButtonGroup>
          <ModalBtn
            mode="full"
            width={"100px"}
            lineHeight="27px"
            height="35px"
            margin="0"
            radius="100px"
            special
            onClick={handleSubmit}
          >
            ثبت
          </ModalBtn>
          <ModalBtn
            className="profileButton"
            background="transparent"
            margin="0"
            special
            radius="100px"
            width={"100px"}
            onClick={onCancel}
            lineHeight="27px"
            height="35px"
          >
            بازگشت
          </ModalBtn>
        </ButtonGroup>
      </Form>
    </ProductModal>
  );
};

const Error = styled.div`
  color: #da0606;
  font-size: 0.7rem;
  margin-right: 5px;
  font-weight: bold;
  margin-top: -10px;
`;
const Input = styled(CustomInput)`
  &:focus {
    border: 2px solid blue;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  /* display: flex;
  justify-content: center; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  & .ripples {
    width: fit-content !important;
    height: unset !important;
  }
`;
const Form = styled.form``;
export default ReportTemplate;
