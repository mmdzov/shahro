import ProductModal from "components/Store/ProductModal";
import {
  ModalHeader,
  ModalForm,
  InputGroup,
  ModalClose,
  InvalidPrice,
  ModalTitle,
  ModalSubtitle,
} from "./Wallet.styled";
import CloseIcon from "@material-ui/icons/Close";
import toToman from "utilities/toToman";
import { useEffect, useState } from "react";
import toPersian from "utilities/ToPersian";
import { ButtonBase, IconButton } from "@material-ui/core";

const WalletModalPay = ({ open, setOpen, handleGetDevice }) => {
  const [state, setState] = useState({
    price: "",
  });
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const filter = value.replace(/[^0-9]/g, "");
      setState((prev) => ({ ...prev, price: filter }));
    } else setState((prev) => ({ ...prev, [name]: value }));
    if (+value > 1000 && +value <= 1000000) setMsg("");
  };

  const handleSubmit = () => {
    if (+state.price < 1000) setMsg("حداقل مبلغ مجاز 1,000 تومان است");
    if (+state.price > 1000000) setMsg("حداکثر مبلغ مجاز 1,000,000 تومان است");
    console.log(state);
  };

  const [width, setWidth] = useState(window.innerWidth);

  function getWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", () => getWidth());
    // eslint-disable-nexdt-line react-hooks/exhaustive-deps
  }, []);

  const [size, setSize] = useState({
    width: "",
    height: "",
    maxWidth: "300px",
  });
  useEffect(() => {
    if (size.maxWidth === "auto") {
      handleGetDevice("mobile");
    } else {
      handleGetDevice("tabletOrHigher");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, open]);

  useEffect(() => {
    if (width <= 479)
      setSize({ width: "100%", height: "100%", maxWidth: "auto" });
    else if (width >= 480)
      setSize({ width: "87%", height: "auto", maxWidth: "300px" });
  }, [width, open]);
  const handleClose = () => {
    setOpen(false);
    setMsg("");
    setState({ price: "" });
  };
  return (
    <>
      {open ? (
        <ProductModal
          padding={"0px"}
          w={size?.width ?? "87%"}
          h={size?.height ?? "auto"}
          mw={size?.maxWidth}
          style={{ borderRadius: 2, overflow: "auto", direction: "ltr" }}
        >
          <ModalHeader className="walletModalHeader">
            <div style={{ marginRight: "35px" }}>افزایش موجودی</div>
            <ModalClose onClick={handleClose}>
              <IconButton color="inherit">
                <CloseIcon style={{ fontSize: "1.2rem" }} />
              </IconButton>
            </ModalClose>
          </ModalHeader>
          <ModalForm onSubmit={(e) => e.preventDefault()}>
            <ModalTitle>
              با افزودن موجودی می توانید سفارش هایتان را سریعتر و راحت تر ثبت
              کنید.
            </ModalTitle>
            <InputGroup invalid={msg?.length > 0 ? true : false}>
              <label htmlFor="">
                مبلغ <InvalidPrice>{toPersian(msg)}</InvalidPrice>{" "}
              </label>
              <input autoComplete="off"
                type="tel"
                onChange={handleChange}
                name="price"
                value={state.price}
                placeholder="1,000"
              />
              <div
                style={{
                  textAlign: "left",
                  height: 25,
                  fontSize: ".9rem",
                  fontWeight: "600",
                  color: msg?.length > 0 ? "#ff4e4e" : "#008eff",
                  whiteSpace: "nowrap",
                }}
              >
                {state?.price > 0 ? toToman(state?.price) : null}
              </div>
            </InputGroup>
            <ButtonBase
              style={{ borderRadius: "5px", overflow: "hidden", width: "100%" }}
            >
              <div
                onClick={handleSubmit}
                className="primary"
                style={{ padding: "5px 10px", width: "100%" }}
              >
                ثبت
              </div>
            </ButtonBase>
            <ModalSubtitle>
              پولی که به کیف پول منتقل می کنید ایمن و پایدار است و با استفاده از
              ان می توانید خرید های آینده خود را داشته باشید.
            </ModalSubtitle>
          </ModalForm>
        </ProductModal>
      ) : null}
    </>
  );
};

export default WalletModalPay;
