import toToman from "utilities/toToman";
import {
  Price,
  ProdCount,
  ProdCounter,
  ProdItem,
  ProdItemCount,
  ProdItemFlex,
  ProdItemHeader,
  ProdItemLeft,
  ProdItemRight,
  ProdItemTitle,
} from "./Basket.styled";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const BasketItem = ({ item, onCount, onDelete }) => {
  return (
    <ProdItem>
      <ProdItemHeader>
        <ProdItemRight>
          <ProdItemTitle>{item.title}</ProdItemTitle>
          <ProdItemCount>
            <ProdCounter>
              <div
                onClick={() => onCount(item.datetime, "inc", item.token)}
                style={{ cursor: "pointer" }}
              >
                <AddIcon />
              </div>
              <ProdCount>{item.count.toLocaleString("fa-IR")}</ProdCount>
              <div
                onClick={() => onCount(item.datetime, "dec", item.token)}
                style={{ cursor: "pointer" }}
              >
                <RemoveIcon />
              </div>
            </ProdCounter>
          </ProdItemCount>
        </ProdItemRight>
        <ProdItemLeft>
          <img src={item.image} alt="" />
        </ProdItemLeft>
      </ProdItemHeader>
      <ProdItemFlex>
        <span>قیمت</span>
        <span style={{ textAlign: "center", fontSize: 13 }}>
          {toToman(item?.off ? item?.off : item.price)}
        </span>
      </ProdItemFlex>
      <ProdItemFlex>
        <span>قیمت کل</span>
        <Price style={{ fontSize: 13 }}>{toToman(item.totalPrice)}</Price>
      </ProdItemFlex>
      <ProdItemFlex style={{ color: "red" }}>
        <span style={{ cursor: "pointer", width: 30 }} onClick={onDelete}>
          حذف
        </span>
      </ProdItemFlex>
    </ProdItem>
  );
};

export default BasketItem;
