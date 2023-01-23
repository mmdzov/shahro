import { useEffect, useRef, useState } from "react";
import BarLayout from "../../layouts/BarLayout";
import {
  Form,
  Input,
  Title,
  InputContainer,
  FormContainer,
  Btn,
  Loading,
  AlertMsg,
  RedirectText,
} from "./Bill.styled";
import BarTempBtn from "../Utilities/BarTempBtn";
import billService from "api/billService";
import handleApiErrors from "utilities/handleApiErrors";
import LodingDotPlus from "../Utilities/Loadings/LoadingDotPlus";
import styled from "styled-components";
import AuthAlert from "components/Utilities/AuthAlert";

const Bill = () => {
  const [state, setState] = useState({
    code: { text: "", isValid: false },
    paymentCode: { text: "", isValid: false },
  });
  const [alert, setAlert] = useState({
    code: "",
    paymentCode: "",
  });
  let rf = useRef(null);
  const rf1 = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [billId, setBillId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value.match(/[0-9]/g)?.join("");
    if (val?.length >= 5) setAlert((prev) => ({ ...prev, [name]: "" }));
    setState((prev) => ({
      ...prev,
      [name]: {
        text: !val ? "" : val,
        isValid: val?.length < 5 ? false : true,
      },
    }));
  };
  const handlePayBill = async () => {
    const { code, paymentCode } = state;
    setError("");
    setSuccess("");
    setBillId("");
    setLoading(false);
    if (code.isValid) setAlert((prev) => ({ ...prev, code: "" }));
    if (paymentCode.isValid) setAlert((prev) => ({ ...prev, paymentCode: "" }));
    if (!code.isValid) {
      rf.current.focus();
      return setAlert((prev) => ({
        ...prev,
        code: "شناسه قبض نباید کوچک تر از 5 رقم باشد",
      }));
    }
    if (!paymentCode.isValid) {
      rf1.current.focus();

      return setAlert((prev) => ({
        ...prev,
        paymentCode: "شناسه پرداخت نباید کوچک تر از 5 رقم باشد",
      }));
    }
    try {
      const data = await billService.checkBill({
        code: state.code.text,
        paymentCode: state.paymentCode.text,
      });
      handleApiErrors(data)
        .then((res) => {
          setSuccess(res.alert.message);
          setBillId(res.result.billID);
          setTimeout(async () => {
            setSuccess("");
          }, 3000);
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePay = async () => {
    if (!billId) return;
    try {
      const result = await billService.payBill({
        billID: billId,
      });
      handleApiErrors(result)
        .then((r) => {
          if (r?.alert?.message) setSuccess(r.alert.message);
          if (!r?.alert?.message) setLoading(true);
          setTimeout(() => {
            window.location.href = r.result.paymentLink;
            setLoading(false);
          }, 2000);
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setBillId("");
    setLoading(false);
    rf?.current.focus();
    return () => {
      setLoading(false);
      setBillId("");
    };
  }, []);

  return (
    <BarLayout title="پرداخت قبض">
      <FormContainer>
        {loading ? (
          <Loading>
            <LodingDotPlus isRelative={false} />
            <RedirectText>
              <div>در حال هدایت به درگاه بانکی</div>
            </RedirectText>
          </Loading>
        ) : null}
        <Form onSubmit={(e) => e.preventDefault()}>
          <Title>پرداخت قبض</Title>
          <InputContainer>
            <Input
              autoComplete="off"
              type="tel"
              inputMode="numeric"
              name="code"
              placeholder="شناسه قبض"
              value={state.code.text}
              onChange={handleChange}
              ref={rf}
              focusBorder={alert.code ? "2px solid #dc3e3e" : ""}
            />
            {alert?.code ? <AlertMsg>{alert.code}</AlertMsg> : null}
          </InputContainer>
          <InputContainer>
            <Input
              type="tel"
              autoComplete="off"
              inputMode="numeric"
              name="paymentCode"
              value={state.paymentCode.text}
              placeholder="شناسه پرداخت"
              onChange={handleChange}
              focusBorder={alert.paymentCode ? "2px solid #dc3e3e" : ""}
              ref={rf1}
            />
            {alert?.paymentCode ? (
              <AlertMsg>{alert.paymentCode}</AlertMsg>
            ) : null}
          </InputContainer>
          <Btn>
            {error ? (
              <AuthAlert
                alert={{ title: "", message: error }}
                go={() => setError("")}
              />
            ) : null}
            {success.length > 0 ? (
              <AuthAlert
                alert={{ title: "", message: success }}
                go={() => setSuccess("")}
              />
            ) : null}
            {billId ? (
              <BtnTemp
                onClick={handlePay}
                style={{ background: "#0089ff", color: "white", border: "0px" }}
              >
                پرداخت و مطمئن هستم
              </BtnTemp>
            ) : (
              <BtnTemp
                onClick={handlePayBill}
                style={{ background: "#0089ff", color: "white", border: "0px" }}
              >
                بزن بریم
              </BtnTemp>
            )}
          </Btn>
        </Form>
      </FormContainer>
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

export default Bill;
