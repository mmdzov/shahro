import CustomInput from "components/Utilities/CustomInput";
import Select from "../../components/Utilities/Select/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addComment, getCommentItem } from "store/actions/productAction";
import styled from "styled-components";
import Modal from "components/Utilities/Modal/Modal";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LodingDotPlus from "../../components/Utilities/Loadings/LoadingDotPlus";
import { useHistory } from "react-router-dom";
import AuthAlert from "components/Utilities/AuthAlert";
import ErrorImages from "components/Utilities/ErrorImages";
import { ButtonBase } from "@material-ui/core";
import { ModalWrapper } from "components/Utilities/ModalButton/ModalButton";
import ModalConnection from "components/Utilities/Modal/ModalConnection";

const AddComment = () => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [other, setOther] = useState([0, 0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [validate, setValidate] = useState({ title: "" });
  const [check, setCheck] = useState(1);
  // const [otherTitles] = useState([
  //   "ارزش خرید نسبت به",
  //   "ارزش خرید نسبت به قیمت",
  //   "ارزش خرید نسبت به کیفیت",
  //   "ارزش خرید نسبت به خدمات پس از فروش",
  // ]);
  const [state, setState] = useState({
    title: "",
    text: "",
  });
  const { commentForm: cmf } = useSelector(({ product }) => product);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value?.length >= 3) setValidate({ title: "" });
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const [l, setL] = useState(false);
  const handleAddComment = async () => {
    setModal(false);
    const data = {
      ...state,
      rates: other.join(","),
      product: token,
      recommend: check,
    };
    await setL(true);
    await dispatch(addComment(data, setModal));
    await setL(false);
  };

  // const [Alert,setAlert] = useState(false)
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    await setLoading(true);
    await dispatch(getCommentItem(token));
    await setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changed = (where) => {
    const Other = [...other];
    Other[+where[1]] = where[0];
    setOther(Other);
  };
  const handleSubmit = () => {
    if (state?.title?.length < 3)
      return setValidate({ title: "عنوان حداقل باید دارای سه حرف باشد." });
    setModal(true);
  };
  if (loading) return <LodingDotPlus isRelative={false} />;
  return (
    <AddCmContainer>
      {l ? <ModalConnection /> : null}
      {notifAlert.mode === "addComment" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => {
            history.replace(`/store/product/${token}`);
          }}
        />
      ) : null}
      <ErrorImages
        width={100}
        height={100}
        src={cmf?.productImage}
        isRadius={true}
      />
      {modal ? (
        <Modal opacity="1" w="86%">
          <RecommendContainer>
            <RecommendText>
              این محصول را برای دیگران پیشنهاد میکنید؟
            </RecommendText>
            <Recommend onClick={() => setCheck(1)}>
              <CheckContainer>
                {check === 1 ? (
                  <RadioButtonChecked />
                ) : (
                  <RadioButtonUnchecked style={{ color: "rgb(128 128 128)" }} />
                )}
              </CheckContainer>
              <RecommendContent style={{ width: 20 }}></RecommendContent>
              <Title>نظری ندارم</Title>
            </Recommend>
            <Recommend onClick={() => setCheck(2)}>
              <CheckContainer>
                {check === 2 ? (
                  <RadioButtonChecked />
                ) : (
                  <RadioButtonUnchecked style={{ color: "rgb(128 128 128)" }} />
                )}
              </CheckContainer>
              <RecommendContent style={{ color: "green" }}>
                <IconWrapper>
                  <EmojiEmotionsIcon />
                </IconWrapper>
                <Title>این محصول رو پیشنهاد میکنم</Title>
              </RecommendContent>
            </Recommend>
            <Recommend onClick={() => setCheck(3)}>
              <CheckContainer>
                {check === 3 ? (
                  <RadioButtonChecked />
                ) : (
                  <RadioButtonUnchecked style={{ color: "rgb(128 128 128)" }} />
                )}
              </CheckContainer>
              <RecommendContent style={{ color: "#d40000" }}>
                <IconWrapper>
                  <ThumbDownIcon />
                </IconWrapper>
                <Title>این محصول رو پیشنهاد نمیکنم</Title>
              </RecommendContent>
            </Recommend>
            <ModalWrapper style={{ marginTop: "15px" }}>
              <ModalBtn mode="full" onClick={handleAddComment}>
                ثبت
              </ModalBtn>
              <ModalBtn onClick={() => setModal(false)}>بازگشت</ModalBtn>
            </ModalWrapper>
          </RecommendContainer>
        </Modal>
      ) : null}

      <AddCmTitle>{cmf?.productTitle}</AddCmTitle>
      {validate.title ? (
        <AuthAlert alert={{ title: " ", message: validate?.title }} />
      ) : null}
      <Form onSubmit={(e) => e.preventDefault()}>
        <div style={{ height: "95px" }}>
          <CustomInput
            label="عنوان نظر اجباری"
            mode="group"
            onChange={handleChange}
            name="title"
          />
          <InvalidTitle>{validate?.title}</InvalidTitle>
        </div>
        <CustomInput
          label="متن نظر"
          mode="group"
          onChange={handleChange}
          name="text"
          type="textarea"
        />
        {cmf?.fields?.map((item, i) => (
          <Select
            name={item?.name}
            change={changed}
            key={item?.name}
            index={i}
          />
        ))}
        <PrimaryBtn type="submit" className="primary" onClick={handleSubmit}>
          <ButtonBase style={{ width: "100%", height: "100%" }}>
            ثبت نظر
          </ButtonBase>
        </PrimaryBtn>
      </Form>
    </AddCmContainer>
  );
};

const InvalidTitle = styled.span`
  color: red;
  margin-top: -9px;
  display: flex;
  font-size: 0.8rem;
  margin-right: 5px;
  font-weight: 600;
`;

const Title = styled.div`
  font-weight: 600;
`;
const IconWrapper = styled.div`
  width: 23px;
  padding: 0 5px;
  & > svg {
    font-size: 1rem;
  }
`;
const RecommendContent = styled.div`
  color: green;
  display: flex;
  align-items: center;
`;
const CheckContainer = styled.div`
  color: #008eff;
  cursor: pointer;
  & > div::first-of-type {
    width: 20px;
  }
`;
const Recommend = styled.div`
  display: flex;
  margin-bottom: 5px;
  padding: 0 5px;
  font-size: 0.8rem;
  align-items: center;
`;

const RecommendText = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
const RecommendContainer = styled.div``;
const PrimaryBtn = styled.button`
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 45px;
  font-size: 1rem;
  color: white;
  font-weight: 600;
`;
const Form = styled.form`
  width: 100%;
  padding: 0 7px;
`;
const AddCmTitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 5px;
`;
const AddCmContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
  padding-top: 20px;
`;
export default AddComment;
