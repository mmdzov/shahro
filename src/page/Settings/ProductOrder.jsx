/* eslint-disable no-unused-vars */
import EmptyBasket from "components/Basket/EmptyBasket";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import AuthAlert from "components/Utilities/AuthAlert";
import ErrorImages from "components/Utilities/ErrorImages";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import useLoading from "hooks/useLoading";
import StoreLayout from "layouts/StoreLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { clearOrders, setOrders } from "store/actions/productAction";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import payStatusColor from "utilities/PayStatusColor";
import toToman from "utilities/toToman";
import { useState } from "react";
import { clearAlert } from "store/actions/_MainAction";
import { Helmet } from "react-helmet";
import AddIcon from "components/Utilities/AddIcon";
const ProductOrder = () => {
  const { state } = useLocation();
  const { order } = useSelector(({ product }) => product);
  const history = useHistory();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getDatas = async () => {
    setLoading(true);
    await dispatch(setOrders());
    setLoading(false);
  };
  useEffect(() => {
    getDatas();
    return () => {
      dispatch(clearOrders());
      dispatch(clearAlert());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  if (Object.keys(order).length === 0 || order?.orders?.length === 0)
    return (
      <StoreLayout>
        <EmptyBasket
          title={"هنوز سفارشی ثبت نکردید"}
          msg={"درحال حاظر سفارشی ندارید"}
        />
        <AddIcon to={{ pathname: "/store", state: { from: "order" } }} />
      </StoreLayout>
    );
  return (
    <StoreLayout>
      <Helmet>
        <title>پیگیری سفارش های خرید - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content="پیگیری سفارش های خرید - اپلیکیشن شهری میرسه"
        ></meta>
      </Helmet>
      {notifAlert.mode === "setProductOrder" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          //   go={() => history.replace("/setting")}
        />
      ) : null}
      <List>
        {order?.orders?.map((item) => (
          <Item
          className="productOrderItem"
            key={item?.token}
            onClick={() => history.push(`/order/${item.token}`)}
          >
            <Row>
              <FlexibleItem>
                <MutedTitle>وضعیت سفارش:</MutedTitle>
                <Status color={payStatusColor(item.status).color}>
                  {payStatusColor(item.status).name}
                </Status>
              </FlexibleItem>
            </Row>
            <Row>
              <FlexibleItem>
                <MutedTitle>کد سفارش:</MutedTitle>
                <div style={{ marginRight: 7 }}>{item?.id}</div>
              </FlexibleItem>
              <div style={{ color: "#00adff" }}>{toToman(item?.price)}</div>
            </Row>
            <Row>
              <FlexibleItem style={{ marginRight: 5 }}>
                <span>{item?.counts}</span>
                <span>عدد</span>
              </FlexibleItem>
              <div>{toPersian(item?.datetime)}</div>
            </Row>
            <Row style={{ direction: "ltr", height: "auto" }}>
              <FlexibleItem>
                {item?.products?.map((prod) => (
                  <ImageItem key={prod.token}>
                    <ErrorImages src={prod.image} width={50} height={50} />
                  </ImageItem>
                ))}
              </FlexibleItem>
            </Row>
          </Item>
        ))}
      </List>
      <AddIcon to={{ pathname: "/store", state: { from: "order" } }} />
      {/* <EmptyBasket title="بدون سفارش" msg="درحال حاظر سفارشی ندارید!" /> */}
    </StoreLayout>
  );
};
const ImageItem = styled.div`
  margin-right: 5px;
`;
const FlexibleItem = styled(Scroll)`
  display: flex;
  overflow-x: auto;
  padding-bottom: 12px;
`;
const Status = styled.div`
  margin-right: 10px;
  color: ${({ color }) => color};
`;

const MutedTitle = styled.div`
  color: #757575;
`;

const List = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
`;

const Item = styled.div`
  margin: 0 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 7px 2px #ececec;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
  display: flex;
  align-items: center;
`;

export default ProductOrder;
