import ProductModal from "components/Store/ProductModal";
import { useState } from "react";
import {
  AddPostForm as Container,
  PostFieldTitle,
  PostField,
  PostFieldList,
  ModalSelectItem,
  ModalSelectList,
  PostFieldItem,
  PostFieldWrapper,
  VideoContainer,
  VideoIcon,
} from "../AddPost/AddPost.styled";
import Temp from "../AddPost/Temp";
import CloseIcon from "@material-ui/icons/Close";
import { useContext } from "react";
import AddIcon from "components/Utilities/AddIcon";
import AddProductContext from "context/AddProductContext";
import AuthAlert from "components/Utilities/AuthAlert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import numberPattern from "utilities/numberPattern";
import AddProductFormFeatures from "./AddProductFormFeatures";

const AddProductForm = () => {
  const { form, setForm, msg, setMsg, files, setFiles, submit } =
    useContext(AddProductContext);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        text:
          name === "price" || name === "discount"
            ? numberPattern(value)
            : value,
      },
    }));
    if (name === "title" && form?.[name].text.length >= 4) {
      setMsg((prev) => ({ ...prev, title: "" }));
      setForm((prev) => ({
        ...prev,
        [name]: { ...prev?.[name], isValid: true },
      }));
    }
    if (name === "price" && form?.[name].text.length >= 0) {
      setMsg((prev) => ({ ...prev, price: "" }));
      setForm((prev) => ({
        ...prev,
        [name]: { ...prev?.[name], isValid: true },
      }));
    }
  };

  const [alert, setAlert] = useState("");
  const handleChangeImg = (e) => {
    const { name } = e.target;
    const check = files.filter((item) => item.type === name);

    if (name === "image" && check.length >= 8) {
      setOpen(false);
      return setAlert("تعداد عکس بیش از حد مجاز است");
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
    setOpen(false);
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
  const handleClose = (id) => {
    const fs = files.filter((item) => item.id !== id);
    setFiles(fs);
  };
  return (
    <Container className="homeSlideList">
      <AddIcon mode="div" isDone onClick={submit} />
      {alert.length > 0 ? (
        <AuthAlert
          alert={{ title: "", message: alert }}
          go={() => setAlert("")}
        />
      ) : null}
      {open ? (
        <ProductModal>
          <div
            onClick={() => setOpen(false)}
            style={{ marginTop: "-9px", cursor: "pointer" }}
          >
            <CloseIcon />
          </div>
          <ModalSelectList>
            <ModalSelectItem>
              <div>آپلود عکس</div>
              <input
                autoComplete="off"
                type="file"
                accept="image/jpeg,image/png,image/bmp"
                onChange={handleChangeImg}
                multiple="multiple"
                name="image"
                id=""
              />
            </ModalSelectItem>
          </ModalSelectList>
        </ProductModal>
      ) : null}
      <Temp
        name="title"
        msg={msg.title}
        label="عنوان محصول"
        value={form.title.text}
        change={handleChange}
      />
      <Temp
        tel
        name="price"
        msg={msg.price}
        amount={form.price.text}
        label="قیمت محصول"
        value={form.price.text}
        change={handleChange}
        dir="ltr"
      />
      <Temp
        tel
        name="discount"
        label="تخفیف"
        amount={form.discount.text}
        value={form.discount.text}
        change={handleChange}
        dir="ltr"
      />
      <AddProductFormFeatures features={form.features} />
      <Temp
        name="description"
        type={false}
        value={form.description.text}
        label="توضیح محصول"
        change={handleChange}
      />
      <PostFieldWrapper>
        <PostFieldTitle onClick={() => setOpen(true)}>
          اضافه کردن تصویر جدید
        </PostFieldTitle>
        <PostField>
          <PostFieldList>
            {files?.map((item) => (
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
                      className={`${
                        item.play ? "videoIconActived" : "videoIcon"
                      }`}
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
      </PostFieldWrapper>
    </Container>
  );
};

export default AddProductForm;
