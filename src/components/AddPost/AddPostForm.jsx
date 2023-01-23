/* eslint-disable no-unused-vars */
import ProductModal from "components/Store/ProductModal";
import { useEffect, useState } from "react";
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
} from "./AddPost.styled";
import Temp from "./Temp";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useContext } from "react";
import AddPostContext from "context/AddPostContext";
import AddIcon from "components/Utilities/AddIcon";
import { useSelector } from "react-redux";
import AuthAlert from "components/Utilities/AuthAlert";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddPostForm = ({ opened }) => {
  const {
    form,
    setForm,
    msg,
    setMsg,
    files,
    setFiles,
    submit,
    deletedImages,
    deletedVideos,
    setDeletedVideos,
    setDeletedImages,
  } = useContext(AddPostContext);
  const [open, setOpen] = useState(false);
  const { allowToCreate } = useState;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: { ...prev?.[name], text: value },
    }));
    if (name === "title" && form?.[name].text.length >= 4) {
      setMsg((prev) => ({ ...prev, title: "" }));
      setForm((prev) => ({
        ...prev,
        [name]: { ...prev?.[name], isValid: true },
      }));
    }
    if (name === "description" && form?.[name].text.length >= 1) {
      setForm((prev) => ({
        ...prev,
        [name]: { ...prev?.[name], isValid: true },
      }));
      setMsg((prev) => ({ ...prev, description: "" }));
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
    setOpen(false);
  };
  const handlePlay = (id) => {
    const e = document.getElementById(id);
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
    const deletedImgs = [...deletedImages];
    const deletedVids = [...deletedImages];
    const deletedI = files.filter(
      (item) => item.id === id && item.type === "image"
    );
    deletedImgs.push(deletedI[0]?.url);
    setDeletedImages(deletedImgs);
    const deletedV = files.filter(
      (item) => item.id === id && item.type === "video"
    );
    deletedVids.push(deletedV[0]?.url);
    setDeletedVideos(deletedVids);
    const fs = files.filter((item) => item.id !== id);
    setFiles(fs);
  };
  const { token } = useParams();
  return (
    <Container className="homeSlideList">
      {opened ? (
        <AddIcon mode="div" isDone onClick={submit} />
      ) : token ? (
        <AddIcon mode="div" isDone onClick={submit} />
      ) : null}
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
                name="image"
                multiple="multiple"
                id=""
              />
            </ModalSelectItem>
            <ModalSelectItem>
              <div>آپلود فیلم</div>
              <input
                autoComplete="off"
                type="file"
                multiple="multiple"
                accept="video/mp4,video/mkv"
                onChange={handleChangeImg}
                name="video"
                id=""
              />
            </ModalSelectItem>
          </ModalSelectList>
        </ProductModal>
      ) : null}
      <Temp
        name="title"
        msg={msg.title}
        label="عنوان"
        value={form.title.text}
        change={handleChange}
      />

      {/*
      <Temp
        name="subTitle"
        label="زیر عنوان مطلب"
        value={form.subTitle.text}
        change={handleChange}
      />
      */}

      <Temp
        msg={msg.description}
        name="description"
        type={false}
        value={form.description.text}
        label="توضیح"
        change={handleChange}
      />
      <PostFieldWrapper>
        <PostFieldTitle onClick={() => setOpen(true)}>
          اضافه کردن تصویر و ویدیو جدید
        </PostFieldTitle>
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

export default AddPostForm;
