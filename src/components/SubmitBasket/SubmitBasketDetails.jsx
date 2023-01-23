import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toToman from "utilities/toToman";
import {
  Container,
  Title,
  BasketDetailItem,
  DiscountPrice,
  TotalContainer,
} from "./SubmitBasket.styled";

const SubmitBasketDetails = () => {
  const { details, discount: disc } = useSelector(({ product }) => product);
  const { location } = useSelector(({ account }) => account);
  const [oldPrice, setOldPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const getPrice = (cb = () => {}, mode = "price", check = "off") => {
    const ins = details.products;
    if (ins?.some((item) => item?.[check] > 0)) {
      const offs = ins
        .map((item) => {
          if (mode === "price") {
            return item?.[mode] * item.count;
          } else if (mode === "off" && item?.off) {
            return (item.price - item?.[mode]) * item.count;
          } else if (mode === "off" && !item?.off) {
            return 0;
          }
          return item;
        })
        .filter((item) => item);
      let totalOffs = 0;
      if (offs.length > 0) {
        for (let i in offs) {
          totalOffs += offs[i];
        }
        cb(totalOffs);
      }
    }
  };
  useEffect(() => {
    
  },[])
  const disct = (totalPrice, discount, mode = "price") => {
    if (mode === "discount") {
      return totalPrice - totalPrice * ((100 - discount) / 100);
    }
    return totalPrice * ((100 - discount) / 100);
  };
  const priceNaN = (pc, price) => {
    return isNaN(pc + location?.deliveryPrice)
      ? price
      : pc + location?.deliveryPrice;
  };
  const discountPrice = (price, mode = "total") => {
    const isDeliveryPrice =
      location?.deliveryPrice > 0 ? location?.deliveryPrice : 0;
    const pc =
      details?.totalPriceWithOff > 0
        ? details?.totalPriceWithOff
        : details?.totalPriceWithoutOff;
    console.log(pc, price, mode, isDeliveryPrice, location);
    if (disc.type === 0 && mode === "discount") return discount;
    if (disc.type === 0 && mode === "total") {
      return priceNaN(pc, price);
    }
    if (disc.type === 0 && mode === "totalDiscount") {
      console.log(price, discount, mode, pc);
      return price + discount;
    }
    if (mode === "total" && disc.type === 1)
      // return (price -= disc.value) - (discount ? discount : 0);
      return priceNaN(pc, price) + discount - (disc.value + discount);
    if (mode === "discount" && disc.type === 1) return (price += disc.value);
    if (disc.type === 1 && mode === "totalDiscount")
      return pc + isDeliveryPrice + (discount ? discount : 0);
    if (mode === "total" && disc.type === 2)
      return (
        disct(pc + discount, disc.value) +
        isDeliveryPrice -
        (discount ? discount : 0)
      );
    if (mode === "discount" && disc.type === 2)
      return (
        disct(pc + discount, disc.value, "discount") + (discount ? discount : 0)
      );
    if (disc.type === 2 && mode === "totalDiscount")
      return pc + isDeliveryPrice + (discount ? discount : 0);
  };

  useEffect(() => {
    getPrice(setOldPrice);
    getPrice(setDiscount, "off");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, oldPrice]);
  return (
    <Container style={{ paddingBottom: 0, marginBottom: 0 }} className="submitBasketContainer">
      <Title>جزئیات قابل پرداخت</Title>
      <div style={{ padding: "10px 8px", paddingBottom: 0 }}>
        <BasketDetailItem>
          <span>هزینه کل محصولات</span>
          <div>
            {toToman(
              details?.totalPriceWithOff > 0
                ? details?.totalPriceWithOff
                : details?.totalPriceWithoutOff
            )}
          </div>
        </BasketDetailItem>
        {(discount && discount !== 0) || disc.type > 0 ? (
          <BasketDetailItem style={{ color: "#f52a2a" }}>
            <span>تخفیف</span>
            <div>{toToman(discountPrice(discount, "discount"))}</div>
          </BasketDetailItem>
        ) : null}
        {location?.deliveryPrice ? (
          <BasketDetailItem>
            <span>هزینه ارسال</span>
            <div>{toToman(location?.deliveryPrice)}</div>
          </BasketDetailItem>
        ) : null}
        <BasketDetailItem
          style={{ borderTop: "1px solid #ccc", height: 50, marginTop: 10 }}
        >
          <span>جمع</span>
          <TotalContainer>
            {oldPrice > 0 || disc.type > 0 ? (
              <DiscountPrice>
                {toToman(
                  discountPrice(
                    details?.totalPriceWithOff +
                      (location?.deliveryPrice ? location?.deliveryPrice : 0),
                    "totalDiscount"
                  )
                )}
              </DiscountPrice>
            ) : null}
            {details?.totalPriceWithOff > 0 ? (
              <div style={{ color: "#008eff" }}>
                {toToman(
                  discountPrice(
                    details?.totalPriceWithOff +
                      (location?.deliveryPrice ? location?.deliveryPrice : 0)
                  )
                )}
              </div>
            ) : (
              <div style={{ color: "#008eff" }}>
                {toToman(
                  discountPrice(
                    details?.totalPriceWithoutOff +
                      (location?.deliveryPrice ? location?.deliveryPrice : 0)
                  )
                )}
              </div>
            )}
          </TotalContainer>
        </BasketDetailItem>
      </div>
    </Container>
  );
};

export default SubmitBasketDetails;
