import { useSelector } from "react-redux";
import payStatusColor from "utilities/PayStatusColor";
import toPersian from "utilities/ToPersian";
import toToman from "utilities/toToman";
import { ItemContainer, ItemRow } from "./Order.styled";

const OrderItem = () => {
  const {
    order: { order: item },
    location,
  } = useSelector(({ product }) => product);

  return (
    <ItemContainer>
      <ItemRow color={payStatusColor(item?.status)?.color}>
        <div>وضعیت سفارش : </div>
        <div>{payStatusColor(item?.status)?.name}</div>
      </ItemRow>
      <ItemRow>
        <div>روش پرداخت : </div>
        {item?.payment === 1 ? (
          <div>پرداخت آنلاین</div>
        ) : (
          <div>پرداخت درب منزل</div>
        )}
      </ItemRow>
      <ItemRow>
        <div>تاریخ ثبت سفارش : </div>
        <div>{toPersian(item?.datetime)}</div>
      </ItemRow>
      <ItemRow>
        <div>کد سفارش : </div>
        <div>{toPersian(item?.id)}</div>
      </ItemRow>
      <ItemRow>
        <div>تعداد کل : </div>
        <div>{(item?.counts && toPersian(item?.counts)) || "نامعلوم"}</div>
      </ItemRow>
      <ItemRow>
        <div>ارسال به : </div>
        <div>{location?.address || "نامعلوم"}</div>
      </ItemRow>
      {item?.price ? (
        <ItemRow color="#00a3ff">
          <div>مبلغ کل : </div>
          <div>{toToman(+item?.price)}</div>
        </ItemRow>
      ) : (
        <ItemRow>
          <div>مبلغ کل : </div>
          <div>{toToman(+item?.off)}</div>
        </ItemRow>
      )}
    </ItemContainer>
  );
};

export default OrderItem;
