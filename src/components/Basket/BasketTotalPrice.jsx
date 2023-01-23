import { TwoDot } from "components/Store/Product.styled";
import { useSelector } from "react-redux";
import toToman from "utilities/toToman";
import { TotalPrice, TotalPurchase } from "./Basket.styled";

const BasketTotalPrice = () => {
  const { totalPrice } = useSelector(({ product }) => product);
  return (
    <TotalPurchase>
      <div style={{ fontSize: 14 }}>
        جمع کل خرید <TwoDot>:</TwoDot>
      </div>
      <TotalPrice>{toToman(totalPrice)}</TotalPrice>
    </TotalPurchase>
  );
};

export default BasketTotalPrice;
