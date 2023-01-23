import CustomInput from "components/Utilities/CustomInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Title, Btn, DiscountCodeForm } from "./SubmitBasket.styled";
import AuthAlert from "components/Utilities/AuthAlert";
import styled from "styled-components";
import { setBasketDiscount } from "store/actions/productAction";
import ModalConnection from "components/Utilities/Modal/ModalConnection";

const SubmitBasketOffCode = () => {
  const [discount, setDiscount] = useState("");
  const dispatch = useDispatch();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { discount: code } = useSelector(({ product }) => product);
  const [loading, setLoading] = useState(false);
  const handleChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const handleSubmit = async () => {
    await setLoading(true);
    await dispatch(setBasketDiscount(discount));
    await setLoading(false);
  };
  return (
    <Container className="submitBasketContainer">
      <Title>کد تخفیف</Title>
      {loading ? <ModalConnection /> : null}
      {notifAlert.mode === "discountCode" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
        />
      ) : null}
      <DiscountCodeForm onSubmit={(e) => e.preventDefault()}>
        <CustomInput
          dir="ltr"
          mode="single"
          value={discount}
          disabled={code.type > 0 && code.value > 0 ? true : false}
          style={{
            border:
              code.type > 0 && code.value > 0
                ? "1px solid #a9a9a9"
                : "1px solid #008eff",
          }}
          onChange={handleChangeDiscount}
        />
        <Button
          onClick={
            !(code.type > 0 && code.value > 0) ? () => handleSubmit() : null
          }
          color={code.type > 0 && code.value > 0 ? "#008eff" : "#08c508"}
        >
          {code.type > 0 && code.value > 0 ? "اعمال شد" : "اعمال کردن"}
        </Button>
      </DiscountCodeForm>
    </Container>
  );
};

const Button = styled(Btn)`
  height: 100%;
  line-height: 45px;
  padding: 0 8px;
  width: 80px;
  text-align: center;
  white-space: nowrap;
  color: ${({ color }) => color};
`;

export default SubmitBasketOffCode;
