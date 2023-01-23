/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import postService from "api/postService";
import { Form } from "components/AddPost/AddPost.styled";
import AddPostForm from "components/AddPost/AddPostForm";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AddPostContext from "context/AddPostContext";
import usePath from "hooks/usePath";
import AdsLayout from "layouts/AdsLayout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEditPost, getPost, setSinglePost } from "store/actions/postAction";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import styled from "styled-components";
import handleApiErrors from "utilities/handleApiErrors";
import HasPageWrapper from "../../container/HasPageWrapper";
const AddPost = ({ isPage = true, open = false }) => {
  const history = useHistory();
  const { token } = useParams();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { post } = useSelector(({ post }) => post);
  const [msg, setMsg] = useState({ title: "", description: "" });
  const [files, setFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedVideos, setDeletedVideos] = useState([]);
  const [l, setL] = useState(false);
  const [postLink, setPostLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: { text: "", isValid: false },
    subTitle: { text: "", isValid: false },
    description: { text: "", isValid: false },
    isFormValid: false,
  });
  const dispatch = useDispatch();
  const getSinglePost = async () => {
    if (token) {
      await setLoading(true);
      await dispatch(getEditPost(token, history));
      await setLoading(false);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, []);
  useEffect(() => {
    if (token && post && Object.keys(post)?.length > 0) {
      setForm((prev) => ({
        ...prev,
        title: { text: post?.title, isValid: true },
        subTitle: { text: post?.subtitle, isValid: true },
        description: { text: post?.text, isValid: true },
        isFormValid: true,
      }));
      setFiles(post?.slides);
    }
  }, [post]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { goReplace } = usePath();
  const sendPost = async (param) => {
    dispatch(clearErrMsg());
    try {
      await setL(true);
      let data;
      if (token) {
        data = await postService.editPost(param);
      } else data = await postService.addPost(param);

      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has } }) => {
          setPostLink(result?.token);
          if (token) dispatch(setSinglePost());
          setDeletedImages([]);
          if (has === 1) {
            dispatch(
              setAlert({
                mode: "successAddPost",
                show: true,
                title,
                msg,
                has,
              })
            );
          } else {
            // history.push(`/media/post/${result?.token}`);
            goReplace(`/media/post/${result?.token}`, { from: "editPost" });
          }
          setL(false);
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "errorAddPost",
              show: true,
              title: e.title,
              msg: e.message,
              has: e.has,
            })
          );
          setL(false);
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      setL(false);
      dispatch(setErrMsg(e));
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const submit = () => {
    setOpenModal(true);
    const {
      title: { text: title },
      subTitle: { text: subtitle },
      description: { text: desc },
    } = form;
    if (title.length < 5) {
      return setMsg((prev) => ({
        ...prev,
        title: "عنوان حداقل باید پنج حرف باشد",
      }));
    }
    if (desc.length < 2) {
      return setMsg((prev) => ({
        ...prev,
        description: "توضیح حداقل باید دو حرف باشد",
      }));
    }
    const formData = new FormData();
    const images = files.filter((item) => item.type === "image");
    const videos = files.filter((item) => item.type === "video");
    const body = {
      title: title?.trim(),
      subtitle: subtitle?.trim(),
      description: desc?.trim(),
      image_count: images.length - deletedImages.length,
      video_count: videos.length - deletedVideos.length,
    };
    if (token) {
      const deletedItems = deletedImages.concat(deletedVideos);
      const remainingImages = post?.slides
        .map((item) => {
          if (deletedItems.includes(item)) return item;
          return false;
        })
        .filter((item) => item);
      body.deletedImages = deletedItems;
      body.previousImages = remainingImages;
      body.post = token;
    }

    for (let i in images) {
      let b = +i + 1;
      if (images[i]?.file) {
        formData.append(`image${b}`, images[i].file);
      }
    }
    for (let i in videos) {
      let b = +i + 1;
      if (videos[i]?.file) {
        formData.append(`video${b}`, videos[i].file);
      }
    }
    formData.append("body", JSON.stringify(body));
    sendPost(formData);
  };
  useEffect(() => {
    // document.getElementsByTagName("html")[0].className = "homeSlideList";
    // return () => (document.getElementsByTagName("html")[0].className = "");
  }, []);
  const cancel = () => {
    history.replace("/media");
  };
  if (token && loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <HasPageWrapper component={AdsLayout} isPage={isPage}>
      <AddPostContext.Provider
        value={{
          submit,
          cancel,
          form,
          setForm,
          msg,
          setMsg,
          files,
          setFiles,
          deletedImages,
          deletedVideos,
          setDeletedVideos,
          setDeletedImages,
        }}
      >
        <Container>
          {isPage ? (
            <Helmet>
              <title>افزودن پست جدید - اپلیکیشن شهری میرسه</title>
              <meta
                name="keywords"
                content={"افزودن پست جدید - اپلیکیشن شهری میرسه"}
              ></meta>
            </Helmet>
          ) : null}
          {openModal && (msg?.title || msg?.description) ? (
            <AuthAlert
              alert={{ title: " ", message: msg?.title || msg?.description }}
              go={() => setOpenModal(false)}
            />
          ) : null}
          {l ? <ModalConnection /> : null}
          {notifAlert.mode === "successAddPost" ||
          notifAlert.mode === "errorAddPost" ? (
            <AuthAlert
              alert={{ title: notifAlert.title, message: notifAlert.msg }}
              go={
                notifAlert.mode === "successAddPost"
                  ? () =>
                      goReplace(`/media/post/${postLink}`, { from: "addPost" })
                  : () => {}
              }
            />
          ) : null}
          <Form onSubmit={(e) => e.preventDefault()}>
            {/* <AddPostHeader /> */}
            <AddPostForm isPage={isPage} opened={open} />
          </Form>
        </Container>
      </AddPostContext.Provider>
    </HasPageWrapper>
  );
};

const Container = styled.div`
  color: white;
  /* background: rgb(36, 84, 254);
  background: -moz-linear-gradient(
    270deg,
    rgba(36, 84, 254, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  background: -webkit-linear-gradient(
    270deg,
    rgba(36, 84, 254, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  background: linear-gradient(
    270deg,
    rgba(36, 84, 254, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2454fe",endColorstr="#00d4ff",GradientType=1); */
`;

export default AddPost;
