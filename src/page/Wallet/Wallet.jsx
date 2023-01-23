import WalletList from "../../components/Wallet/WalletList";
import toToman from "utilities/toToman";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { getWallet, setAccountPage } from "store/actions/accountAction";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import AddIcon from "components/Utilities/AddIcon";
import WalletModalPay from "components/Wallet/WalletModalPay";
import { setHasEndPages } from "store/actions/_MainAction";

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [inf, setInf] = useInfiniteScroll();
  const [loading, setLoading] = useState(false);
  const { moreWallet } = useSelector(({ account }) => account);
  const { hasEndPages } = useSelector(({ _MainReducer }) => _MainReducer);
  const [l, setL] = useState(true);
  const dispatch = useDispatch();
  const getData = async () => {
    await setL(true);
    await dispatch(getWallet());
    await setL(false);
  };
  const getDataWhenScroll = async () => {
    await setLoading(true);
    await dispatch(getWallet());
    await setLoading(false);
    await setInf(false);
  };
  useEffect(() => {
    if (hasEndPages) return;
    if (inf) {
      getDataWhenScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inf]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    return () => {
      dispatch(setHasEndPages());
      dispatch(setAccountPage(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [modalDevice, setModalDevice] = useState("tabletOrHigher");
  const handleModalDevice = (device) => {
    if (open) {
      setModalDevice(device);
    } else {
      setModalDevice("tabletOrHigher");
    }
  };
  if (l) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      {loading ? (
        <LodingDotPlus isRelative={false} isFixed isBg={false} />
      ) : null}
      <div className="fixed" style={{ width: "100%" }}>
        <TopWallet
          className="walletHeader"
          onClick={
            moreWallet?.allowToPay === 1 ? () => setOpen(true) : () => {}
          }
          style={{ cursor: moreWallet?.allowToPay === 1 ? "pointer" : "unset" }}
        >
          <TopWalletPrice>{toToman(moreWallet?.sum)}</TopWalletPrice>
          <TopWalletMode>موجودی حساب</TopWalletMode>
        </TopWallet>
      </div>
      {modalDevice === "tabletOrHigher" ? <WalletList /> : null}
      <WalletModalPay
        open={open}
        setOpen={setOpen}
        handleGetDevice={handleModalDevice}
      />
      {moreWallet?.allowToPay === 1 ? (
        <AddIcon mode="div" onClick={() => setOpen(true)} />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0px;
`;

const TopWalletPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;

const TopWalletMode = styled.div`
  font-size: 0.8rem;
  color: #0874b3;
  font-weight: 600;
  margin-top: 1px;
`;

const TopWallet = styled.div`
  margin-bottom: 20px;
  border-radius: 6px;
  padding: 5px 10px;
  margin: 0 10px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px 3px 6px 0px #e4e4e4;
`;

export default Wallet;
