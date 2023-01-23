import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import toToman from "utilities/toToman";
import toFarsi from "utilities/toFarsi";
import { addToBasket } from "store/actions/productAction";
import { useParams } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import ProductModal from "./ProductModal";
import { ProdBuy } from "./Product.styled";
import styled from "styled-components";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AuthAlert from "components/Utilities/AuthAlert";
import { ButtonBase } from "@material-ui/core";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";

const ProductBuy = ({ color, size }) => {
  const {
    single: { product: prod },
    loading,
  } = useSelector(({ product }) => product);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [loading1, setLoading1] = useState(false);
  const [modal, setOpenModal] = useState(false);
  const [finallyPrice, setFinallyPrice] = useState({
    price: prod?.price,
    count: 1,
  });
  const dispatch = useDispatch();
  const { token } = useParams();
  const handleBuy = () => {
    if (loading) return;
    // setModal(true);
    setOpenModal((prev) => !prev);
    setFinallyPrice({
      price: prod?.off ? prod?.off : prod?.price,
      count: 1,
    });
  };
  const handleCount = (mode) => {
    const isOff = prod?.off ? prod?.off : prod?.price;
    if (mode === "inc") {
      return setFinallyPrice((prev) => ({
        ...prev,
        count: prev.count + 1,
        price: +prev.price + +isOff,
      }));
    }
    if (finallyPrice.count < 1) {
      return setFinallyPrice((prev) => ({
        ...prev,
        count: 1,
        price: +isOff,
      }));
    }
    setFinallyPrice((prev) => ({
      ...prev,
      count: prev.count === 1 ? 1 : prev.count - 1,
      price: prev.count === 1 ? +isOff : +prev.price - +isOff,
    }));
  };
  const handleSubmit = async () => {
    if (loading) return;
    setOpenModal(false);
    await setLoading1(true);
    await dispatch(
      addToBasket({
        product: token,
        color: color?.token ?? null,
        size: size?.token ?? null,
        value: finallyPrice.count,
      })
    );
    await setLoading1(false);
  };
  return (
    <Fragment>
      {loading1 ? <ModalConnection /> : null}
      {notifAlert.mode === "addBasketItem" ||
      notifAlert.mode === "changeBasketCount" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      {modal ? (
        <ProductModal h="auto">
          <BuyContainer>
            <BuyHeader>
              <Title>{prod?.title}</Title>
              <ItemContainer>
                {size?.name ? (
                  <Item>
                    <div>سایز:</div>
                    <div>{size?.name}</div>
                  </Item>
                ) : null}
                {color ? (
                  <Item>
                    <div>رنگ:</div>
                    <div style={{ color: color?.color }}>{color?.name}</div>
                  </Item>
                ) : null}
                <Item>
                  <div>قیمت:</div>
                  <div>{toToman(prod?.off ? prod?.off : prod?.price)}</div>
                </Item>

                {finallyPrice.count > 1 ? (
                  <Item>
                    <div>قیمت کل:</div>
                    <div style={{ color: "#047dd4" }}>
                      {toToman(finallyPrice.price)}
                    </div>
                  </Item>
                ) : (
                  <></>
                )}

                <Item style={{ borderTop: "none" }}>
                  <div>تعداد:</div>
                  <Count>
                    <div onClick={handleCount} style={{ cursor: "pointer" }}>
                      <RemoveIcon />
                    </div>
                    <div style={{ margin: "0 8px" }}>
                      {toFarsi(finallyPrice.count)}
                    </div>
                    <div
                      onClick={() => handleCount("inc")}
                      style={{ cursor: "pointer" }}
                    >
                      <AddIcon />
                    </div>
                  </Count>
                </Item>
              </ItemContainer>
            </BuyHeader>
            <BuyBtnContainer>
              <ModlaCotainer>
                <ModalBtn mode="full" onClick={handleSubmit} width="100%">
                  ثبت
                </ModalBtn>
                <ModalBtn onClick={handleBuy} width="100%">
                  بازگشت
                </ModalBtn>
              </ModlaCotainer>
            </BuyBtnContainer>
          </BuyContainer>
        </ProductModal>
      ) : null}
      {loading ? (
        <ProdBuy
          className="acceptBtnLoading"
          style={{ cursor: "pointer" }}
        ></ProdBuy>
      ) : prod?.inStock !== 0 ? (
        <ProdBuy
          className="acceptBtn"
          onClick={handleBuy}
          style={{ cursor: "pointer" }}
        >
          <ButtonBase style={{ width: "100%", height: "100%" }}>
            خرید
          </ButtonBase>
        </ProdBuy>
      ) : (
        <ProdBuy className="acceptBtnMuted" style={{ cursor: "pointer" }}>
          <ButtonBase style={{ width: "100%", height: "100%" }}>
            ناموجود
          </ButtonBase>
        </ProdBuy>
      )}
    </Fragment>
  );
};

const ModlaCotainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  justify-items: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  grid-gap: 0px;
  padding: 0 20px;
  margin-top: 20px;
  padding: 0px;
  & > button {
    width: 100%;
    padding: 0 15px;
    & > div {
      width: 76px;
    }
  }
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
const BuyBtnContainer = styled.div``;
const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  border-top: 1px solid #dadada;
  padding: 9px 0px;
  font-size: 13px;
  align-items: center;
`;
const ItemContainer = styled.div``;
const Title = styled.div`
  padding: 10px 0px;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
`;
const BuyHeader = styled.div`
  padding: 0 5px;
`;
const BuyContainer = styled.div`
  padding: 10px 20px;
`;
export default ProductBuy;
