import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ProdRateContainer,
  ProdRateCount,
  ProdRateWrapper,
  R,
  Rate,
} from "./Product.styled";

const ProductRate = () => {
  const {
    single: { product: prod },
  } = useSelector(({ product }) => product);
  const [rate, setRate] = useState([
    { item: 1, isActive: false },
    { item: 2, isActive: false },
    { item: 3, isActive: false },
    { item: 4, isActive: false },
    { item: 5, isActive: false },
  ]);
  useEffect(() => {
    const rt = prod?.rate;
    if (rt) {
      let r = [...rate];
      for (let i = 0; i < rt; i++) {
        r[i].isActive = true;
      }
      setRate(r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  return (
    <ProdRateWrapper>
      <ProdRateContainer className='ProdRate'>
        {rate?.map((item) => (
          <Rate key={item.item} className={`${item.isActive ? "active" : ""}`}>
            <R />
          </Rate>
        ))}
      </ProdRateContainer>
      <ProdRateCount>
        ( {prod?.rateCount?.toLocaleString("fa-IR")} )
      </ProdRateCount>
    </ProdRateWrapper>
  );
};

export default ProductRate;
