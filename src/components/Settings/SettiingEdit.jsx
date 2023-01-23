/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  ImageContainer,
  PlusIcon,
  SubmitContainer,
  Container,
  ImageForm,
  RangeContainer,
} from "./SettingEdit.styled";
import ProductModal from "components/Store/ProductModal";
import Cropper from "react-easy-crop";
import AddIcon from "@material-ui/icons/Add";
import { Header, Username, ImageBox } from "./Setting.styled";
import useLoading from "hooks/useLoading";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  InputContainer,
  AlertMsg,
  TextArea,
} from "../Bill/Bill.styled";
import CheckIcon from "@material-ui/icons/Check";
import {
  addProfileImage,
  getAccount,
  updateAccount,
} from "store/actions/accountAction";
import styled from "styled-components";
// import LodingDotPlus from "../Utilities/Loadings/LoadingDotPlus";
import ErrorImages from "components/Utilities/ErrorImages";
import BarLayout from "layouts/BarLayout";
import AuthAlert from "components/Utilities/AuthAlert";
import { clearAlert } from "store/actions/_MainAction";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "utilities/cropImage";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import Ripples from "components/Utilities/Ripples";
import { ButtonBase } from "@material-ui/core";

const SettingEdit = () => {
  const { account, image } = useSelector(({ account }) => account);
  const { alert: notifAlert, guestName } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const dispatch = useDispatch();
  const { loading, setLoading } = useLoading(account);
  const [l, setL] = useState(false);
  const rf = useRef(null);
  const imgFormRf = useRef(null);
  const [alert, setAlert] = useState({ name: "" });
  const [state, setState] = useState({
    name: { text: "", isValid: false, required: true },
    username: { text: "", isValid: true, required: false },
    website: { text: "", isValid: true, required: false },
    biography: {
      text: account?.biography || "",
      isValid: true,
      required: false,
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        text: account?.name || "",
        isValid:
          account?.name?.length === 0 || account?.name?.length >= 3
            ? true
            : false,
      },
      username: {
        ...prev.username,
        text: account?.username || "",
        isValid: account?.username?.length === 0 ? true : true, //(account?.username?.length >= 3 ? true : false)
      },
      website: {
        ...prev.website,
        text: account?.website || "",
        isValid: true,
      },
      biography: {
        ...prev.biography,
        text: account?.biography || "",
        isValid: true,
      },
    }));
  }, [account]);

  useEffect(() => {
    dispatch(getAccount());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        text: value,
      },
    }));
    if (name === "name" && value.length >= 3) {
      setState((prev) => ({ ...prev, name: { ...prev.name, isValid: true } }));
      setAlert((prev) => ({ ...prev, name: "" }));
    }
    if (name === "username" && (value.length >= 3 || value.length === 0)) {
      setState((prev) => ({
        ...prev,
        username: { ...prev.username, isValid: true },
      }));
      setAlert((prev) => ({ ...prev, username: "" }));
    }
  };

  const filtered = (text) => {
    const trimed = text.trim();
    let strippedString = trimed.replace(/(<([^>]+)>)/gi, "");
    return strippedString;
  };

  const isEqual = () => {
    const keys = Object.keys(state).map((item) => {
      if (item === "name") return (item = "name");
      return item;
    });
    let hasChanged = [];
    for (let i = 0; i < keys.length; i++) {
      let b = keys[i];
      if (keys[i] === "name") b = "name";
      if (account?.[keys[i]] === state?.[b]?.text.trim()) {
        hasChanged.push(true);
      } else hasChanged.push(false);
    }
    const result = hasChanged.every((item) => item);
    return result;
  };

  const handleStates = (data) => {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      setState((prev) => ({
        ...prev,
        [keys[i]]: {
          ...prev[keys[i]],
          text: prev[keys[i]].text.trim(),
        },
      }));
    }
  };
  const handleSubmit = async () => {
    if (loading) return setLoading(false);
    const name = state.name.text.length;
    const username = state.username.text?.length;
    if (name < 3 && name > 0) {
      setState((prev) => ({ ...prev, name: { ...prev.name, isValid: false } }));
      setAlert((prev) => ({ ...prev, name: "نام نباید کمتر از 3 حرف باشد" }));
      rf.current.focus();
    }
    if (username > 0 && username < 3) {
      setState((prev) => ({
        ...prev,
        username: { ...prev.username, isValid: false },
      }));
      setAlert((prev) => ({
        ...prev,
        username: "نام کاربری نباید کمتر از 3 حرف باشد",
      }));
    }
    if ((name === 0 || name >= 3) && state.name.isValid) {
      if (username === 0 || (username >= 3 && state.username.isValid)) {
        let hasChanged = isEqual();
        if (hasChanged) {
          return handleStates(state);
        }
        const f = filtered;
        await setL(true);
        await dispatch(
          updateAccount({
            name: f(state.name.text),
            username: f(state.username.text),
            website: f(state.website.text),
            biography: f(state.biography.text),
          })
        );
        await setL(false);
      }
    }
  };
  const [openCrop, setOpenCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [img, setImg] = useState(null);
  const [rotate, setRotate] = useState(0);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(
    async (image) => {
      try {
        const ci = await getCroppedImg(image, croppedAreaPixels, rotate);
        return ci;
      } catch (e) {
        console.error(e);
      }
    },
    [croppedAreaPixels]
  );
  const handleRotate = (mode) => {
    if (mode === "left") {
      if (rotate === 0) setRotate(-90);
      else setRotate((prev) => prev + -90);
    } else if (mode === "right") {
      if (rotate === 0) setRotate(90);
      else setRotate((prev) => prev + 90);
    }
  };
  const handleChangeImage = (e) => {
    setOpenCrop(true);
    const img = e.target.files[0];
    const blob = URL.createObjectURL(img);
    setImg({ file: img, blob });
  };
  const handleUploadImage = async () => {
    setOpenCrop(false);
    await setL(true);
    const file = new FormData();
    const croppedImage = await showCroppedImage(img?.blob);
    console.log("croppedImage", croppedImage);
    var croppedImageFile = new File([croppedImage], 'image.jpg', {type:'image/jpg'});
    console.log("croppedImageFile", croppedImageFile);
    file.append("file", croppedImageFile);
    await dispatch(addProfileImage(file));
    await setL(false);
    setRotate(0);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <BarLayout title="ویرایش حساب" mode="editAccount">
      {l ? <ModalConnection /> : null}
      <Container>
        {notifAlert.mode === "updateAccount" ||
        notifAlert.mode === "addImage" ? (
          <AuthAlert
            alert={{ title: notifAlert.title, message: notifAlert.msg }}
            go={() => dispatch(clearAlert())}
          />
        ) : null}
        {openCrop ? (
          <ProductModal>
            <div
              style={{
                width: "100%",
                height: "250px",
                position: "relative",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <Cropper
                image={img.blob}
                crop={crop}
                rotation={rotate}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <RangeContainer>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleRotate("left")}
              >
                <RotateLeftIcon />
              </div>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
                classes={{ root: "slider" }}
              />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleRotate("right")}
              >
                <RotateRightIcon />
              </div>
            </RangeContainer>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-around",
              }}
            >
              <Ripples
                onClick={() => setOpenCrop(false)}
                color="white"
                radius="0"
              >
                <BtnItem className="gray">لغو</BtnItem>
              </Ripples>

              <Ripples onClick={handleUploadImage} radius="0">
                <BtnItem className="primary">ذخیره</BtnItem>
              </Ripples>
            </div>
          </ProductModal>
        ) : null}
        <Header>
          <ImageContainer>
            <ImageBox>
              <ImageForm style={{ zIndex: 10 }}>
                <input
                  autoComplete="off"
                  ref={imgFormRf}
                  onClick={(e) => {
                    setImg({ file: "", blob: "" });
                    e.target.value = "";
                  }}
                  onChange={handleChangeImage}
                  type="file"
                  name="file"
                  accept="image/*"
                />
              </ImageForm>
              {/* {!image ? (
                <AccountCircleIcon />
              ) : (
                
              )} */}
              <ErrorImages
                height={100}
                width={100}
                src={image}
                user
                border="1px solid #eee"
                sizeIcon={"2rem"}
              />
            </ImageBox>
            <PlusIcon onClick={() => imgFormRf.current.click()}>
              <AddIcon />
            </PlusIcon>
          </ImageContainer>
          <Username>{account.name ? account.name : guestName}</Username>
        </Header>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputContainer>
            <Input
              autoComplete="off"
              type="text"
              placeholder="نام"
              name="name"
              value={state.name.text}
              onChange={handleChange}
              ref={rf}
              disabled={loading}
              focusBorder={alert.name ? "2px solid #dc3e3e" : ""}
            />
            {alert?.name ? <AlertMsg>{alert.name}</AlertMsg> : null}
          </InputContainer>
          <InputContainer style={{ direction: "ltr" }}>
            {state.username.text.length === 0 ? (
              <label htmlFor="username">نام کاربری</label>
            ) : null}
            <Input
              autoComplete="off"
              id="username"
              type="text"
              name="username"
              value={state.username.text}
              // placeholder="نام کاربری"
              onChange={handleChange}
              focusBorder={alert.username ? "2px solid #dc3e3e" : ""}
              disabled={loading}
            />
          </InputContainer>
          {alert?.name ? <AlertMsg>{alert.username}</AlertMsg> : null}

          <InputContainer style={{ height: 137 }}>
            <TextArea
              type="text"
              disabled={loading}
              name="biography"
              value={state.biography.text}
              placeholder="بیوگرافی"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer style={{ direction: "ltr" }}>
            {state.website.text.length === 0 ? (
              <label htmlFor="website">آدرس وبسایت</label>
            ) : null}
            <Input
              id="website"
              type="text"
              autoComplete="off"
              disabled={loading}
              name="website"
              value={state.website.text}
              // placeholder="آدرس وبسایت"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              dir="ltr"
              name="phoneNumber"
              placeholder={`+${account.phoneNumber || "9890000000"}`}
              disabled
              autoComplete="off"
            />
            <AlertMsg style={{ fontSize: ".7rem" }}>
              توجه ! تغییر دادن شماره همراه امکان پذیر نیست!
            </AlertMsg>
          </InputContainer>
          <SubmitContainer>
            <Ripples color="white" radius="0" onClick={handleSubmit}>
              <SubmitForm
                className="primary"
                style={{
                  cursor: "pointer",
                  zIndex: 1,
                  color: "white",
                }}
              >
                <ButtonBase style={{ width: "100%", height: "100%" }}>
                  <label style={{ fontSize: "1.4rem" }}>تمام</label>

                  <CheckIcon style={{ fontSize: "2rem" }} />
                </ButtonBase>
              </SubmitForm>
            </Ripples>
          </SubmitContainer>
        </Form>
      </Container>
    </BarLayout>
  );
};

const BtnItem = styled.button`
  width: 80px;
  height: 35px;
  border-radius: 5px;
  &.gray {
    background: #ccc;
    color: white;
  }
`;
const SubmitForm = styled.button`
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  left: 0px;
`;

export default SettingEdit;
