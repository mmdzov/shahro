/* eslint-disable no-unused-vars */
import { PostFieldTitle } from "components/AddPost/AddPost.styled";
import ProductModal from "components/Store/ProductModal";
import CustomInput from "components/Utilities/CustomInput";
import AdsContext from "context/AdsContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdsFields,
  getEditAds,
  setAdsFields,
} from "store/actions/adsAction";
import styled from "styled-components";
import {
  PostField,
  PostFieldList,
  PostFieldItem,
  VideoContainer,
  VideoIcon,
} from "../../components/AddPost/AddPost.styled";
import CloseIcon from "@material-ui/icons/Close";
import {
  clearAlert,
  clearErrMsg,
  setAlert,
  setErrMsg,
} from "store/actions/_MainAction";
import adsService from "api/adsService";
import handleApiErrors from "utilities/handleApiErrors";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AuthAlert from "components/Utilities/AuthAlert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useHistory, useParams } from "react-router-dom";
import numberPattern from "utilities/numberPattern";
import { Helmet } from "react-helmet";
import toToman from "utilities/toToman";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import Ripples from "components/Utilities/Ripples";

const AddAds = () => {
  const { fields } = useSelector(({ ads }) => ads);
  const [typeField] = useState(["توافقی", "معاوضه", "مقطوع"]);
  const [validate, setValidate] = useState({
    type: "",
    title: "",
    price: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [selected, setSelected] = useState("بدون قیمت");
  const { token: adsToken } = useParams();
  const [token, setToken] = useState("");
  const { openModal: open, setOpenModal: setOpen } = useContext(AdsContext);
  const [open1, setOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [requiredText, setRequiredText] = useState("اجباری");
  const [value, setValue] = useState({
    title: "",
    price: "",
    description: "",
  });
  const getData = async () => {
    await setLoading(true);
    await dispatch(getAdsFields());
    await setLoading(false);
  };
  const getEditData = async () => {
    await setLoading(true);
    await dispatch(getEditAds(adsToken));
    await setLoading(false);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adsToken) {
      getEditData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected !== "بدون قیمت")
      setValidate((prev) => ({ ...prev, type: "" }));
  }, [selected]);
  const handleOpenModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
    setOptions(item.options);
  };
  const [files, setFiles] = useState([]);
  const handleClickOptionItem = (id) => {
    const index = fields.findIndex((item) => item.id === selectedItem.id);
    const selected = fields[index]?.options;
    const selectedOption = selected?.findIndex((item) => item.id === id);
    let item = selected[selectedOption];
    if (item.name === "") item = { id: item.id, name: "تعیین نشده" };
    fields[index].selected = item;
    fields[index].invalid = false;
    dispatch(setAdsFields(fields));
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value: val } = e.target;

    if (name === "price") {
      const v = numberPattern(val);
      setValue((prev) => ({ ...prev, price: v }));
      if (value?.price?.trim()?.length > -1)
        setValidate((prev) => ({ ...prev, price: "" }));
    } else setValue((prev) => ({ ...prev, [name]: val }));
    if (name === "title" && value?.title.trim()?.length > 5)
      setValidate((prev) => ({ ...prev, title: "" }));
    if (name === "description" && value?.description?.trim()?.length > 10)
      setValidate((prev) => ({ ...prev, description: "" }));
  };

  const handleChangeParams = (e, item) => {
    const { name, value } = e.target;
    const flds = [...fields];
    const index = flds.findIndex((item) => item.name === name);
    const unit = flds[index];
    if (unit.type === "number") {
      unit.value = numberPattern(value);
    } else {
      unit.value = value;
    }

    if (value?.length > 0 && unit.required) {
      unit.invalid = false;
    }
    dispatch(setAdsFields(flds));
  };

  const handleChangeImg = (e) => {
    const { name } = e.target;
    const check = files.filter((item) => item.type === name);

    if (name === "image" && check.length >= 8) {
      setOpen(false);
      return setAlert("تعداد عکس بیش از حد مجاز است");
    }
    if (name === "video" && check.length >= 5) {
      setOpen(false);
      return setAlert("تعداد ویدیو بیش از حد مجاز است");
    }
    const f = [...files];
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const url = URL?.createObjectURL(file.item(i));
      f.push({
        file: file.item(i),
        url,
        type: name,
        play: false,
        id: "b" + ~~(Math.random() * 99999999999),
        name: name === "image" ? `image${i + 1}` : `video${i + 1}`,
      });
    }
    setFiles(f);
  };
  const [l, setL] = useState(false);
  const sendAds = async (params) => {
    await dispatch(clearErrMsg());
    await setL(true);
    try {
      const data = await adsService.adsCompose(params);
      handleApiErrors(data)
        .then(({ result, alert: { has, title, message: msg } }) => {
          console.log(result);
          setToken(result?.token ?? "");
          if (has === 1) {
            dispatch(
              setAlert({ mode: "addAds", has, title: title, msg, show: true })
            );
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "addAds",
              has: e.has,
              title: e.title,
              msg: e.message,
              show: true,
            })
          );
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setL(false);
  };

  const handlePlay = (id) => {
    const e = document.getElementById(id);
    console.log(e);
    const fs = [...files];
    const index = fs.findIndex((item) => item.id === id);
    if (fs[index].play === false) {
      e.play();
      fs[index].play = true;
    } else {
      e.pause();
      fs[index].play = false;
    }
    setFiles(fs);
  };

  const handleSubmit = () => {
    const flds = [...fields];
    flds.map((item) => {
      if (
        item.type === "select" &&
        item.selected.name.includes("انتخاب کنید") &&
        item.required
      )
        item.invalid = true;
      else if (
        item.type === "select" &&
        !item.selected.name.includes("انتخاب کنید") &&
        item.required
      )
        item.invalid = false;
      else if (
        item.type !== "select" &&
        item.value.length === 0 &&
        item.required
      )
        item.invalid = true;
      else if (item.type !== "select" && item.value.length > 0 && item.required)
        item.invalid = false;
      return item;
    });
    dispatch(setAdsFields(flds));
    setOpenModal(true);
    if (selected === "بدون قیمت")
      return setValidate((prev) => ({
        ...prev,
        type: "توجه! لطفا نوع آگهی را انتخاب کنید!",
      }));
    if (selected === "مقطوع" && value.price.trim().length < 1)
      return setValidate((prev) => ({
        ...prev,
        price: "توجه! لطفا قیمت مناسبی وارد کنید!",
      }));
    if (value.title.trim().length < 5)
      return setValidate((prev) => ({
        ...prev,
        title: "توجه! لطفا بیشتر از 5 حروف وارد کنید!",
      }));
    if (value.description.trim() < 10)
      return setValidate((prev) => ({
        ...prev,
        description: "توجه! لطفا بیشتر از 10 حروف وارد کنید!",
      }));
    let isValid = true;
    fields.map((item) => {
      if (item.invalid) return (isValid = false);
      return item;
    });

    if (!isValid)
      return setValidate((prev) => ({
        ...prev,
        fields: "توجه! فیلد ها را تکمیل کنید.",
      }));
    const formData = new FormData();
    const images = files.filter((item) => item.type === "image");
    const videos = files.filter((item) => item.type === "video");
    const fld = fields.map((item) => {
      if (item.type === "select") {
        return {
          name: item.name,
          value:
            item.selected.name === "انتخاب کنید" ||
            item.selected.name === "تعیین نشده"
              ? ""
              : item.selected.name,
        };
      } else if (item.type === "text") {
        return { name: item.name, value: item.value.trim() };
      } else {
        return { name: item.name, value: item.value };
      }
    });
    const body = {
      type: selected,
      title: value?.title.trim(),
      price: +value?.price.trim() ?? null,
      fields: fld,
      description: value?.description.trim(),
      image_count: images.length,
      video_count: videos.length,
    };
    for (let i in images) {
      let b = +i + 1;
      formData.append(`image${b}`, images[i].file);
    }
    for (let i in videos) {
      let b = +i + 1;
      formData.append(`video${b}`, videos[i].file);
    }
    formData.append("body", JSON.stringify(body));
    sendAds(formData);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClose = (id) => {
    const fs = files.filter((item) => item.id !== id);
    setFiles(fs);
  };
  const history = useHistory();

  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Helmet>
        <title>افزودن آگهی جدید - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"افزودن  آگهی جدید - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      {openModal &&
      (validate?.type ||
        validate?.title ||
        validate?.fields ||
        validate?.price ||
        validate?.description) ? (
        <AuthAlert
          alert={{
            title: " ",
            message:
              validate?.type ||
              validate?.title ||
              validate?.fields ||
              validate?.price ||
              validate?.description,
          }}
          go={() => {
            setOpenModal(false);
            // setValidate("");
          }}
        />
      ) : null}
      {l ? <ModalConnection /> : null}
      {notifAlert.mode === "addAds" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
          go={() => {
            if (token.length > 0) {
              history.push(`/ads/ads-single/${token}`);
            }
          }}
        />
      ) : null}
      <Group>
        <SimpleGroup>
          <CustomInput
            fontSize="0.9rem"
            label={requiredText + "نوع آگهی"}
            name="type"
            type="select"
            defaultSelected={selected}
            mode="group"
            open={open1}
            setOpen={setOpen1}
          >
            {typeField.map((item) => (
              <SelectedItemRipple
                color="gray"
                radius="0"
                key={~~(Math.random() * 99999999)}
                onClick={() => {
                  setSelected(item);
                  setOpen1(false);
                }}
                delay={300}
                className="selectedItem"
                delayAfterClick={300}
              >
                <SelectItem>{item}</SelectItem>
              </SelectedItemRipple>
            ))}
          </CustomInput>
          <Invalid>{validate.type}</Invalid>
        </SimpleGroup>
        {selected === "مقطوع" ? (
          <SimpleGroup>
            <CustomInput
              type="tel"
              onChange={handleChange}
              label={requiredText + "قیمت"}
              value={value.price}
              style={{ height: 50, direction: "ltr" }}
              fontSize="0.9rem"
              name="price"
              mode="group"
            />
            {value?.price.length > 0 ? (
              <PriceValue invalid={validate?.price?.length > 0 ? true : false}>
                {toToman(value?.price)}
              </PriceValue>
            ) : null}
            <Invalid>{validate.price}</Invalid>
          </SimpleGroup>
        ) : null}
        <SimpleGroup>
          <CustomInput
            onChange={handleChange}
            style={{ height: 50 }}
            value={value.title}
            label={requiredText + "عنوان"}
            fontSize="0.9rem"
            name="title"
            mode="group"
          />
          <Invalid>{validate.title}</Invalid>
        </SimpleGroup>
        <CustomInput
          onChange={handleChange}
          fontSize="0.9rem"
          label={requiredText + "توضیح"}
          name="description"
          mode="group"
          value={value.description}
          type="textarea"
          style={{ height: 130 }}
        />
        <Invalid>{validate.description}</Invalid>
      </Group>
      {open ? (
        <ProductModal blur={() => setOpen(false)}>
          {options?.map((item) => (
            <SelectedItemRipple
              color="gray"
              radius="0"
              key={~~(Math.random() * 99999999)}
              onClick={(e) => {
                // handleChangeParams(e, item);
                handleClickOptionItem(item.id);
              }}
              delay={300}
              className="selectedItem"
              delayAfterClick={300}
            >
              <SelectItem>{item.name}</SelectItem>
            </SelectedItemRipple>
          ))}
        </ProductModal>
      ) : null}
      <Group>
        {fields?.map((item) => (
          <SimpleGroup key={item.id}>
            {item.type === "text" ? (
              <SimpleGroup>
                <CustomInput
                  style={{ height: 50 }}
                  label={
                    item.label.replace("اجباری", "") +
                    (item.required ? requiredText : "")
                  }
                  fontSize="0.9rem"
                  name={item.name}
                  value={item.value}
                  id={`b${item.id}`}
                  onChange={(e) => handleChangeParams(e, item)}
                  mode="group"
                />
                {item.invalid ? (
                  <Invalid>توجه ! پر کردن این فیلد اجباری است!</Invalid>
                ) : null}
              </SimpleGroup>
            ) : item.type === "select" ? (
              <SimpleGroup>
                <CustomInput
                  fontSize="0.9rem"
                  label={
                    item.label.replace("اجباری", "") +
                    (item.required ? requiredText : "")
                  }
                  name="type"
                  type="select"
                  defaultSelected={item.selected.name}
                  mode="group"
                  open={false}
                  setOpen={() => handleOpenModal(item)}
                />
                {item.invalid ? (
                  <Invalid>توجه ! پر کردن این فیلد اجباری است!</Invalid>
                ) : null}
              </SimpleGroup>
            ) : item.type === "number" ? (
              <SimpleGroup>
                <CustomInput
                  style={{ height: 50 }}
                  label={
                    item.label.replace("اجباری", "") +
                    (item.required ? requiredText : "")
                  }
                  fontSize="0.9rem"
                  value={item.value}
                  type="tel"
                  name={item.name}
                  mode="group"
                  id={`b${item.id}`}
                  dir="ltr"
                  onChange={(e) => handleChangeParams(e, item)}
                />
                {item.invalid ? (
                  <Invalid>توجه ! پر کردن این فیلد اجباری است!</Invalid>
                ) : null}
              </SimpleGroup>
            ) : null}
          </SimpleGroup>
        ))}
      </Group>
      <Group style={{ paddingTop: 25, paddingBottom: 0 }}>
        <AddNewImage>
          اضافه کردن تصویر جدید
          <input autoComplete="off"
            type="file"
            accept="image/jpeg,image/png,image/bmp"
            onChange={handleChangeImg}
            name="image"
            multiple="multiple"
            id=""
          />
        </AddNewImage>
        <PostField>
          <PostFieldList>
            {files.map((item) => (
              <PostFieldItem key={item.url}>
                <div
                  style={{
                    right: 3,
                    top: 3,
                    color: "#585858",
                    position: "absolute",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose(item.id)}
                >
                  <CloseIcon />
                </div>
                {item.type === "image" ? (
                  <img src={item.url} alt="" />
                ) : (
                  <VideoContainer onClick={() => handlePlay(item.id)}>
                    <VideoIcon
                      style={{
                        background: item.play ? "rgb(0 0 0 / 36%)" : "#1787e8",
                      }}
                    >
                      {item.play ? <PauseIcon /> : <PlayArrowIcon />}
                    </VideoIcon>
                    <video height="190" id={item.id} width="160">
                      <source src={item.url} type="" />
                    </video>
                  </VideoContainer>
                )}
              </PostFieldItem>
            ))}
          </PostFieldList>
        </PostField>
      </Group>
      <Submit type="submit" className="acceptBtn">
        {/*ثبت آگهی*/}
        <Ripples
          onClick={handleSubmit}
          delay={300}
          delayAfterClick={300}
          radius={0}
          className="submitAddAds"
        >
          تمام
        </Ripples>
      </Submit>
    </Container>
  );
};

const AddNewImage = styled(PostFieldTitle)`
  position: relative;
  overflow: hidden;

  & > input {
    position: absolute;
    right: 265px;
    transform: scale(3.5);
    opacity: 0;
  }
`;
const SelectedItemRipple = styled(Ripples)`
  &:not(:last-of-type) {
    border-bottom: 1px solid #dddddd;
  }
  & .touchedItem {
    position: relative !important;
    top: 0 !important;
    border-radius: 0 !important;
    left: 0 !important;
  }
`;
const SelectItem = styled.div`
  height: 40px;
  text-align: center;
  line-height: 38px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
const Invalid = styled.div`
  color: #fe4f4f;
  width: 100%;
  text-align: center;
  height: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 22px;
`;

const Submit = styled.button`
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999999999;
  & .submitAddAds {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SimpleGroup = styled.div`
  height: ${({ height }) => (height ? height : "110px")};
`;

const Group = styled.div`
  width: 100%;
  padding: 0 10px;
  padding-bottom: 25px;
  box-shadow: 0 1px 11px -3px #c4c4c4;
  margin-bottom: 10px;
  padding-top: 10px;
`;

const Container = styled.form`
  padding-bottom: 50px;
`;

export const PriceValue = styled.div`
  text-align: left;
  margin-top: -10px;
  font-size: 0.9rem;
  margin-left: 6px;
  color: ${({ invalid }) => (invalid ? "red" : "#0095ff")};
  font-weight: bold;
`;

export default AddAds;
