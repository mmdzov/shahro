import { Container, Title, InsetLayout } from "./SubmitBasket.styled";
import SelectList from "components/Utilities/SelectList/SelectList";
import { useSelector } from "react-redux";

const SubmitBasketPaymentMethod = ({ check, setCheck }) => {
  const { more } = useSelector(({ account }) => account);
  return (
    <Container className="submitBasketContainer">
      <Title>شیوه پرداخت</Title>
      <InsetLayout style={{ padding: "0 15px" }}>
        <div style={{ marginTop: 10, fontSize: ".9rem", fontWeight: 600 }}>
          <SelectList check={check === 1 ? 1 : 0} onCheck={() => setCheck(1)}>
            <div>پرداخت آنلاین</div>
          </SelectList>
          {!more?.onlyPayOnline ? (
            <SelectList check={check === 0 ? 1 : 0} onCheck={() => setCheck(0)}>
              <div>پرداخت در محل</div>
            </SelectList>
          ) : null}
        </div>
      </InsetLayout>
    </Container>
  );
};

export default SubmitBasketPaymentMethod;
