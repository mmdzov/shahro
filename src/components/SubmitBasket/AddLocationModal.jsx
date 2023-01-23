import ProductModal from "components/Store/ProductModal";
import CustomInput from "components/Utilities/CustomInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, changeLocation } from "store/actions/accountAction";
import { ModalBtnContainer, ModalTitle, Invalid } from "./SubmitBasket.styled";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
import ModalConnection from "components/Utilities/Modal/ModalConnection";

const AddLocationModal = ({
  setOpen,
  setLocs,
  locs,
  open,
  mode,
  token,
  setMode = () => {},
}) => {
  const { locations } = useSelector(({ account }) => account);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validate, setValidate] = useState({ address: "", postalCode: "" });

  useEffect(() => {
    if (mode === "edit") {
      const adr = locations.filter((item) => item.token === token)[0];
      setAddress(adr.address);
      setPostalCode(adr.postalCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    return () => setMode("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (mode) => {
    if (address.length >= 10) setValidate((prev) => ({ ...prev, address: "" }));
    if (postalCode.length >= 10) {
      setValidate((prev) => ({ ...prev, postalCode: "" }));
    }

    if (address.length < 10) {
      setValidate((prev) => ({ ...prev, address: "لطفا آدرس را کامل کنید" }));
      return;
    }

    if (postalCode.length < 10) {
      setValidate((prev) => ({ ...prev, postalCode: "کد پستی صحیح نیست" }));
      return;
    }

    await setOpen(false);
    await setLoading(true);
    if (mode === "edit") {
      await dispatch(changeLocation(token, address, postalCode));
    } else {
      await dispatch(
        addLocation(
          {
            address,
            postalCode,
            lat: 0,
            lng: 0,
          },
          setLocs,
          locs
        )
      );
      setAddress("");
      setPostalCode("");
    }
    await setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "postalCode") {
      const isNumber = /[0-9]/g.test(value);
      setPostalCode(isNumber ? value.replace(/[^0-9]/g, "").slice(0, 10) : "");
      if (value.length >= 10) {
        setValidate((prev) => ({ ...prev, postalCode: "" }));
      }
    }
    if (name === "address") {
      if (value.lengthh > 10) return;
      setAddress(value);
      if (value.length >= 10) setValidate((prev) => ({ ...prev, address: "" }));
    }
  };
  return (
    <>
      {loading ? <ModalConnection /> : null}
      {open ? (
        <ProductModal
        // blur={() => setOpen(false)}
        >
          <ModalTitle>اضافه کردن موقغیت مکانی</ModalTitle>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ padding: "0 15px", marginBottom: 20 }}>
              <div style={{ marginBottom: 20, height: 149 }}>
                <CustomInput
                  label="آدرس"
                  mode="group"
                  onChange={handleChange}
                  type="textarea"
                  name="address"
                  value={address}
                />
                <Invalid>{validate.address}</Invalid>
              </div>
              <div style={{ height: 84 }}>
                <CustomInput
                  style={{ direction: "ltr" }}
                  label="کد پستی"
                  mode="group"
                  name="postalCode"
                  type="tel"
                  onChange={handleChange}
                  value={postalCode}
                />
                <Invalid>{validate.postalCode}</Invalid>
              </div>
            </div>
            <ModalBtnContainer>
              <ModalBtn mode="full" onClick={() => handleSubmit(mode)}>
                ثبت
              </ModalBtn>
              <ModalBtn onClick={() => setOpen(false)}>بازگشت</ModalBtn>
            </ModalBtnContainer>
          </form>
        </ProductModal>
      ) : null}
    </>
  );
};

export default AddLocationModal;
