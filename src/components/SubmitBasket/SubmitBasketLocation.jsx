import ProductModal from "components/Store/ProductModal";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
import SelectList from "components/Utilities/SelectList/SelectList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDefaultLocation, setLocation } from "store/actions/accountAction";
import {
  Container,
  Title,
  Btn,
  More,
  InsetLayout,
  ModalTitle,
  ModalBtnContainer,
} from "./SubmitBasket.styled";
import AuthAlert from "components/Utilities/AuthAlert";
import { useEffect } from "react";
import textLimit from "utilities/textLimit";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AddLocationModal from "./AddLocationModal";
import { clearAlert } from "store/actions/_MainAction";
import { Helmet } from "react-helmet";

const SubmitBasketLocation = () => {
  const history = useHistory();
  const { locations, location } = useSelector(({ account }) => account);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [locs, setLocs] = useState([]);

  useEffect(() => {
    if (locations.length > 0) {
      setLocs(locations?.slice(0, 3));
    }
  }, [locations]);

  const handleCheck = (token) => {
    const getLocations = [...locs];
    const index = getLocations.findIndex((item) => item.token === token);
    const allFalseDefault = getLocations.map((item) => {
      item.isDefault = 0;
      return item;
    });
    getLocations[index].isDefault = 1;
    setLocs(allFalseDefault);
  };
  const handleSubmitLocation = async () => {
    setOpen1(false);
    await setLoading(true);
    const loc = locs.filter((item) => item.isDefault === 1);
    await dispatch(setLocation(...loc));
    await dispatch(setDefaultLocation(loc[0].token));
    await setLoading(false);
  };

  return (
    <Container className="submitBasketContainer">
      <Helmet>
        <title>ثبت و مدیریت آدرس ها - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"ثبت و مدیریت آدرس ها - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      <Title>آدرس</Title>
      {loading ? <ModalConnection /> : null}
      {notifAlert.mode === "addLocation" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => dispatch(clearAlert())}
        />
      ) : null}
      {notifAlert.mode === "changeLocation" ||
      notifAlert.mode === "successAddLocation" ? (
        <AuthAlert
          go={() => dispatch(clearAlert())}
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <AddLocationModal
        open={open}
        setOpen={setOpen}
        setLocs={setLocs}
        locs={locs}
      />
      {open1 ? (
        <ProductModal>
          <ModalTitle>انتخاب محل آدرس</ModalTitle>
          <InsetLayout style={{ padding: "0 15px" }}>
            <div style={{ marginBottom: 25 }}>
              {locs?.map((item) => (
                <SelectList
                  key={item.token}
                  check={item.isDefault}
                  onCheck={() => handleCheck(item.token)}
                >
                  <div>{textLimit(item?.address, 36)}</div>
                  <div style={{ marginTop: 3 }}>
                    <span>
                      پلاک :{" "}
                      <span style={{ color: "#777777" }}>
                        {item.postalCode}
                      </span>
                    </span>
                  </div>
                </SelectList>
              ))}
            </div>
            {locations.length > 2 ? (
              <More
                onClick={() => history.push("/store/basket/submit/locations")}
              >
                بیشتر
              </More>
            ) : null}
          </InsetLayout>
          <ModalBtnContainer>
            <ModalBtn mode="full" onClick={handleSubmitLocation}>
              ثبت
            </ModalBtn>
            <ModalBtn onClick={() => setOpen1(false)}>بازگشت</ModalBtn>
          </ModalBtnContainer>
        </ProductModal>
      ) : null}
      <InsetLayout>
        <div
          style={{
            margin: "10px 0px",
            fontSize: ".9rem",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            overflow: "hidden",
          }}
        >
          {location && Object.keys(location)?.length > 0 ? (
            <>
              <span style={{ marginLeft: 8 }}>ارسال به </span>
              <span
                style={{
                  width: "100%",
                  maxHeight: 40,
                  overflowWrap: "anywhere",
                }}
              >
                {location?.address}
              </span>
            </>
          ) : (
            <div
              style={{ color: "#aeaeae", fontSize: ".9rem", cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              لطفا آدرس خود را وارد نمایید
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: location && Object?.keys(location)?.length > 0 ? 0 : 10,
          }}
        >
          {location && Object.keys(location)?.length > 0 ? (
            <Btn
              onClick={() => setOpen1(true)}
              style={{ marginLeft: 17, marginRight: 5 }}
            >
              تغییر
            </Btn>
          ) : null}
          <Btn onClick={() => setOpen(true)}>اضافه کردن</Btn>
        </div>
      </InsetLayout>
    </Container>
  );
};

export default SubmitBasketLocation;
