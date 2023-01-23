import { ItemRow, ProductItem } from "components/Order/Order.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import textLimit from "utilities/textLimit";
import { Container } from "./AdsOrder.styled";
const AdsOrderList = () => {
  const { order } = useSelector(({ ads }) => ads);
  const history = useHistory();
  const adsStatus = (status) => {
    if (status === -1) return { name: "معلق؛ نیاز به تصویر", color: "#ffbf09" };
    if (status === 0) return { name: "در انتظار تایید", color: "#ffbf09" };
    if (status === 1) return { name: "فعال و در دسترس عموم", color: "#ffbf09" };
    if (status === 2) return { name: "رد شده", color: "#ffbf09" };
    if (status === 3) return { name: "حذف شده", color: "#ffbf09" };
    if (status === 4) return { name: "انقضاء زمان", color: "#ffbf09" };
  };
  return (
    <Container>
      {order.map((item) => (
        <Item
          key={~~(Math.random() * 99999999)}
          onClick={
            item.status !== 3
              ? () => history.push(`/ads/ads-single/${item.token}`)
              : null
          }
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
            style={{ paddingBottom: 5, height: "100%", direction: "rtl" }}
            className="overflow-hidden"
          >
            <h2 className="whitespace-nowrap pr-1" style={{ fontWeight: 600 }}>
              {textLimit(item?.title, 23)}
            </h2>
            <div className="pr-3">
              <Row>
                <div>وضعیت آگهی : </div>
                <div
                  style={{
                    color: adsStatus(item?.status)?.color,
                  }}
                >
                  {adsStatus(item?.status)?.name}
                </div>
              </Row>
              <Row>
                <div>تعداد بازدید : </div>
                <div style={{ color: "green", paddingTop: 4 }}>
                  {item?.views}
                </div>
              </Row>
              <Row>
                <div style={{ marginRight: "-7px" }}>{item?.datetime}</div>
              </Row>
            </div>
          </div>
        </Item>
      ))}
    </Container>
  );
};

const Item = styled(ProductItem)`
  margin: 0 10px;
  padding-left: 5px;
  padding-right: 10px;
  box-shadow: 0 5px 10px 2px #eaeaea;
  border-radius: 6px;
  border: 1px solid #e9e9e9;
  background: white;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Row = styled(ItemRow)`
  height: 28px;
`;

export default AdsOrderList;
