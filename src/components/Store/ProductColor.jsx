import ProductColorTemp from "components/SlideTemp/ProductColorTemp";
import useForceUpdate from "hooks/useForceUpdate";
import useLoading from "hooks/useLoading";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ProdColor,
  ProdColorContainer,
  ProdColorItem,
  ProdColorList,
  ProdColorN,
  ProdTopTitle,
  TwoDot,
} from "./Product.styled";

const ProductColor = ({ color, setColor, onColor }) => {
  const forceUpdate = useForceUpdate();
  const {
    single: { product: prod },
  } = useSelector(({ product }) => product);
  useEffect(() => {
    if (prod) {
      setColor(prod?.colors[0]);
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  const { loading } = useLoading(prod);
  if (loading) return <ProductColorTemp />;
  if (prod?.colors?.length === 0) return null;
  return (
    <ProdColorContainer>
      <ProdTopTitle style={{ display: "flex" }}>
        رنگ<TwoDot>:</TwoDot>
        <ProdColor
          style={{
            color: color?.color,
            width: "auto",
            fontSize: 12,
            lineHeight: "24px",
          }}
        >
          {color?.name}
        </ProdColor>
      </ProdTopTitle>
      <ProdColorList>
        {prod?.colors?.map((item) => (
          <ProdColorItem
            key={item.token}
            style={{
              backgroundColor:
                color?.token === item?.token ? "rgb(241 241 241)" : "white",
            }}
            onClick={() => onColor(item)}
          >
            <ProdColor color={item.color} />
            <ProdColorN>{item.name}</ProdColorN>
          </ProdColorItem>
        ))}
      </ProdColorList>
    </ProdColorContainer>
  );
};

export default ProductColor;
