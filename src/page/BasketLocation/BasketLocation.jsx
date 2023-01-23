import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  getLocation,
  setDefaultLocation,
} from "store/actions/accountAction";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";
import AddLocationModal from "components/SubmitBasket/AddLocationModal";
import ProductModal from "components/Store/ProductModal";
import {
  InsetLayout,
  Title,
} from "components/SubmitBasket/SubmitBasket.styled";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AddIcon from "components/Utilities/AddIcon";
import AuthAlert from "components/Utilities/AuthAlert";
import { clearAlert } from "store/actions/_MainAction";

const BasketLocation = () => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { locations } = useSelector(({ account }) => account);
  const [locs, setLocs] = useState(locations);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [token, setToken] = useState("");
  const [mode, setMode] = useState("");
  const [isDefault, setDefault] = useState(false);
  const dispatch = useDispatch();
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getLocation());
    await setLoading(false);
  };

  useEffect(() => {
    if (locations && Object.keys(locations)?.length > 0) {
      setLocs(locations);
    }
  }, [locations]);

  const handleOpenEdit = () => {
    setOpen1(false);
    setMode("edit");
    setOpen(true);
  };

  const handleOpenDelete = async () => {
    await setOpen1(true);
    await setLoading1(true);
    await dispatch(deleteLocation(token));
    await setLoading1(false);
  };

  useEffect(() => {
    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetDefault = async () => {
    setOpen1(false);
    setLoading1(true);
    await dispatch(setDefaultLocation(token, "edit"));
    setLoading1(false);
  };

  const handleOpen = (id) => {
    setOpen1(true);
    setToken(id);
    const index = locations?.findIndex((item) => item.token === id);
    setDefault(locations[index]?.isDefault);
  };

  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container> 
      {notifAlert.mode === "deleteLocation" ||
      notifAlert.mode === "editLocation" ? (
        <AuthAlert
          alert={{ title: "", message: notifAlert.msg }}
          go={() => dispatch(clearAlert())}
        />
      ) : null}
      {loading1 ? <ModalConnection /> : null}
      {open1 ? (
        <ProductModal blur={() => setOpen1(false)}>
          <Title>انتخاب کنید</Title>
          <ModalList style={{ padding: "0 10px", textAlign: "center" }}>
            {isDefault === 0 ? (
              <ModalItem onClick={handleSetDefault} style={{ marginBottom: 5 }}>
                انتخاب به عنوان پیشفرض
              </ModalItem>
            ) : null}
            <ModalItem onClick={handleOpenEdit} style={{ marginBottom: 5 }}>
              ویرایش آدرس
            </ModalItem>
            <ModalItem onClick={handleOpenDelete}>حذف آدرس</ModalItem>
          </ModalList>
        </ProductModal>
      ) : null}
      <AddLocationModal
        mode={mode}
        setMode={setMode}
        token={token}
        open={open}
        locs={locs}
        setOpen={setOpen}
        setLocs={setLocs}
      />
      <List>
        {locs?.map((item) => (
          <Item
            key={~~(Math.random() * 9999999)}
            id={`b${item?.token}`}
            onClick={() => handleOpen(item.token)}
          >
            <div>
              <div>{item?.address}</div>
              <div>
                <span>پلاک : </span>
                <span>{toPersian(item?.postalCode)}</span>
              </div>
            </div>
            {item.isDefault === 1 ? <div>پیشفرض</div> : <div></div>}
          </Item>
        ))}
      </List>
      <AddIcon onClick={() => setOpen(true)} mode="div" />
    </Container>
  );
};

const ModalList = styled(InsetLayout)`
  padding: 0px 10px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 9px;
  color: #292929;
`;

const ModalItem = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const Container = styled.div``;
const List = styled.div`
  box-shadow: 0 0 8px 0px #d6d6d6;
  padding: 10px 0px;
  padding-top: 0px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  box-shadow: 0 5px 6px -5px #bbbbbb;
  cursor: pointer;
  margin-bottom: 6px;
  height: 75px;
  padding: 0 5px;
  background: white;
  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > div:first-of-type {
      margin-bottom: 1px;
      font-weight: 600;
      overflow: hidden;
      max-height: 46px;
      overflow-wrap: anywhere;
      & > span:last-of-type {
        color: #6d6d6d;
      }
    }
  }
  & > div:last-of-type {
    margin-left: 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-right: 10px;
    font-size: 0.8rem;
    color: #7b7b7b;
  }
`;

export default BasketLocation;
