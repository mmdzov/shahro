import { ButtonBase } from "@material-ui/core";
import { ProdBuy } from "components/Store/Product.styled.js";
import usePath from "hooks/usePath";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "store/actions/productAction";
import { BasketContainer } from "../../components/Basket/Basket.styled";
import BasketList from "../../components/Basket/BasketList";
import BasketTotalPrice from "../../components/Basket/BasketTotalPrice";
import EmptyBasket from "../../components/Basket/EmptyBasket";
import LodingDotPlus from "../../components/Utilities/Loadings/LoadingDotPlus";
const Basket = () => {
  const dispatch = useDispatch();
  const { basket } = useSelector(({ product }) => product);
  const { goForward } = usePath();
  const handleNextStep = () => {
    goForward("/store/basket/submit");
  };
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    await setLoading(true);
    try {
      await dispatch(getBasket());
      await setLoading(false);
    } catch (e) {}
  };
  useEffect(() => {
    document.body.classList.add("bodyGray");
    getData();
    return () => document.body.classList.remove("bodyGray");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  if (!loading && basket.length === 0) return <EmptyBasket />;
  return (
    <BasketContainer>
      <Helmet>
        <title>سبد خرید - اپلیکیشن شهری میرسه</title>
        <meta name="keywords" content="سبد خرید - اپلیکیشن شهری میرسه"></meta>
      </Helmet>
      <BasketTotalPrice />
      <BasketList />
      <ProdBuy
        onClick={handleNextStep}
        style={{
          cursor: "pointer",
          zIndex: 1,
          background: "#117ab7",
          color: "white",
        }}
      >
        <ButtonBase style={{ width: "100%", height: "100%" }}>بعدی</ButtonBase>
      </ProdBuy>
    </BasketContainer>
  );
};

export default Basket;
