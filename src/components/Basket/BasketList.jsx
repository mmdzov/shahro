import AuthAlert from "components/Utilities/AuthAlert";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBasketCount,
  removeBasketItem,
} from "store/actions/productAction";
import { clearAlert } from "store/actions/_MainAction";
import { ProdList, ProdListContainer } from "./Basket.styled";
import BasketItem from "./BasketItem";

const BasketList = () => {
  const { basket } = useSelector(({ product }) => product);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCount = async (datetime, mode) => {
    await setLoading(true);
    await dispatch(changeBasketCount(datetime, mode));
    await setLoading(false);
  };
  const handleDelete = async (item) => {
    await setLoading(true);
    await dispatch(
      removeBasketItem({
        value: 0,
        product: item?.token,
        color: item?.color?.token ?? null,
        size: item?.size?.token ?? null,
      })
    );
    await setLoading(false);
  };
  return (
    <ProdListContainer>
      {loading ? <ModalConnection /> : null}
      {notifAlert.mode === "removeBasketItem" ||
      notifAlert.mode === "addBasketCount" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => dispatch(clearAlert())}
        />
      ) : null}
      <ProdList>
        {basket?.map((item, i) => (
          <BasketItem
            key={i}
            onDelete={() => handleDelete(item)}
            onCount={handleCount}
            item={item}
          />
        ))}
      </ProdList>
    </ProdListContainer>
  );
};

export default BasketList;
