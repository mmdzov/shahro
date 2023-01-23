import ErrorImages from "components/Utilities/ErrorImages";
import LineEllipsis from "components/Utilities/LineEllipsis";
import { useSelector } from "react-redux";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import toToman from "utilities/toToman";
import { ListContainer, ProductItemLink, ItemRow } from "./Order.styled";

const OrderList = () => {
  const {
    order: { products },
  } = useSelector(({ product }) => product);
  return (
    <ListContainer>
      {products?.map((item) => (
        <ProductItemLink
          key={~~(Math.random() * 99999999)}
          to={`/store/product/${item.token}`}
        >
          <div>
            <ErrorImages
              src={item?.image}
              width={100}
              height={100}
              isRadius={"0"}
              isBorder={false}
              sizeIcon="2.4rem"
            />
          </div>
          <div
            style={{ paddingBottom: 5, height: "100%" }}
            className="overflow-hidden"
          >
            <h2 className="pr-1" style={{ fontWeight: 600 }}>
              <LineEllipsis
                ellipsis="..."
                text={toPersian(item?.title)}
                maxLine="1"
              />
            </h2>
            <div className="pr-3 mt-3">
              {item.color ? (
                <Row>
                  <div>رنگ : </div>
                  <div style={{ color: item?.color.color }}>
                    {item?.color.name}
                  </div>
                </Row>
              ) : null}
              {item.size ? (
                <Row>
                  <div>سایز : </div>
                  <div>{item?.size}</div>
                </Row>
              ) : null}
              {item.count ? (
                <Row>
                  <div>تعداد : </div>
                  <div>{toPersian(item?.count)} عدد</div>
                </Row>
              ) : null}
              {item.price ? (
                <Row color="#00a3ff">
                  <div>قیمت : </div>
                  <div>{toToman(item?.price)}</div>
                </Row>
              ) : null}
            </div>
          </div>
        </ProductItemLink>
      ))}
    </ListContainer>
  );
};

const Row = styled(ItemRow)`
  height: 28px;
`;

export default OrderList;
