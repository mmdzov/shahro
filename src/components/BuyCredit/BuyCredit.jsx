import styled from "styled-components";
import { useState } from "react";
import CreditTemplate from "./CreditTemplate";
import BarTempBtn from "../Utilities/BarTempBtn";
import { http } from "api/httpService";
import handleApiErrors from "utilities/handleApiErrors";
import BarLayout from "../../layouts/BarLayout";
import { useEffect } from "react";
import AuthAlert from "components/Utilities/AuthAlert";

const BuyCredit = () => {
  const [simType, setSimType] = useState([
    { label: "MCI", name: "همراه اول", id: 1, checked: true },
    { label: "Irancell", name: "ایرانسل", id: 2, checked: false },
    { label: "Rightel", name: "رایتل", id: 3, checked: false },
  ]);
  const [charge, setCharge] = useState([
    { label: "1K Toman", name: "1000 تومان", id: 1, checked: true },
    { label: "2K Toman", name: "2000 تومان", id: 2, checked: false },
    { label: "5K Toman", name: "5000 تومان", id: 3, checked: false },
    { label: "10K Toman", name: "10000 تومان", id: 4, checked: false },
    { label: "20K Toman", name: "20000 تومان", id: 5, checked: false },
  ]);
  const [alert, setAlert] = useState({});
  const getTellCharge = async (params) => {
    const { data } = await http.post("/buy-tell-recharge", params);
    return data;
  };
  const handleBuyCredit = async () => {
    const type = simType.filter((item) => item.checked)[0];
    const amount = charge.filter((item) => item.checked)[0].name.split(" ")[0];
    try {
      const data = await getTellCharge({ type: type.name, amount: +amount });
      handleApiErrors(data).then((res) => {
        setAlert(res.alert);
        setTimeout(() => {
          setAlert(res.result.paymentLink);
          window.location.href = res.result.paymentLink;
        }, 3000);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BarLayout title="خرید شارژ سیم کارت">
      {alert?.message ? (
        <AuthAlert alert={{ title: alert?.title, message: alert?.message }} />
      ) : null}
      <CreditTemplate list={simType} state={setSimType} />
      <CreditTemplate list={charge} state={setCharge} title="میزان شارژ" />
      <ButtonGroup>
        <BtnTemp onClick={handleBuyCredit}>خرید شارژ و دریافت کد</BtnTemp>
        <BarTempBtn>خرید شارژ مستقیم برای یک شماره</BarTempBtn>
      </ButtonGroup>
    </BarLayout>
  );
};

const BtnTemp = styled(BarTempBtn)`
  background: #0089ff;
  color: white;
  border: 0px;
  transition: all 0.2s ease-in;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgb(4 90 165) !important;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 35px;
  margin-bottom: 20px;
  padding: 0 15px;
`;

export default BuyCredit;
