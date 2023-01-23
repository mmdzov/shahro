import EmptyBasket from "components/Basket/EmptyBasket";
import OrderItem from "components/Order/OrderItem";
import OrderList from "components/Order/OrderList";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import usePath from "hooks/usePath";
import StoreLayout from "layouts/StoreLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleOrder, setSingleOrder } from "store/actions/productAction";
import styled from "styled-components";

const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(({ product }) => product);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { token } = useParams();
  const { goReplace } = usePath();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getSingleOrder(token, history));
    await setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getDatas();
    return () => dispatch(setSingleOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <StoreLayout>
      {notifAlert.mode === "singleOrderError" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title || " ", message: notifAlert?.msg }}
          go={() => goReplace("/order", true)}
        />
      ) : null}
      <Container>
        {Object.keys(order).length === 0 || order?.orders?.length === 0 ? (
          <EmptyBasket
            title={"هنوز سفارشی ثبت نکردید"}
            msg={"درحال حاظر سفارشی ندارید"}
          />
        ) : (
          <>
            <OrderItem loading={loading} />
            <OrderList loading={loading} />
          </>
        )}
      </Container>
    </StoreLayout>
  );
};

const Container = styled.div``;

export default Order;
