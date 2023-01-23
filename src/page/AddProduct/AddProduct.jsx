/* eslint-disable no-unused-vars */
import storeService from "api/storeService";
import { Form } from "components/AddPost/AddPost.styled";
import AddProductForm from "components/AddProduct/AddProductForm";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AddProductContext from "context/AddProductContext";
import AdsLayout from "layouts/AdsLayout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  setProduct,
  setSingleEditProduct,
  setSingleProduct,
} from "store/actions/productAction";
import {
  clearAlert,
  clearErrMsg,
  setAlert,
  setErrMsg,
} from "store/actions/_MainAction";
import styled from "styled-components";
import handleApiErrors from "utilities/handleApiErrors";
import HasPageWrapper from "../../container/HasPageWrapper";

const AddProduct = ({ isPage = true }) => {
  const history = useHistory();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { token: productToken } = useParams();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [l, setL] = useState(false);
  const [msg, setMsg] = useState({ title: "", description: "", price: "" });
  const [files, setFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedVideos, setDeletedVideos] = useState([]);
  const [count, setCount] = useState(10);
  const [form, setForm] = useState({
    title: { text: "", isValid: false },
    price: { text: "", isValid: false },
    discount: { text: "", isValid: false },
    description: { text: "", isValid: false },
    features: [],
    isFormValid: false,
  });
  const dispatch = useDispatch();
  const sendProduct = async (param) => {
    dispatch(clearErrMsg());
    await setL(true);
    try {
      let data;
      if (productToken) {
        data = await storeService.setEditProduct(param);
      } else {
        data = await storeService.productCompose(param);
      }
      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has } }) => {
          setToken(result?.token);
          if (has === 1) {
            dispatch(
              setAlert({
                mode: "successAddProduct",
                show: true,
                title,
                msg,
                has,
              })
            );
          } else if (result?.token?.length > 0) {
            history.push(`/store/product/${result?.token}`);
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "successAddProduct",
              show: true,
              title: e.title,
              msg: e.message,
              has: e.has,
            })
          );
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
    await setL(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const submit = async () => {
    const {
      title: { text: title },
      price: { text: price },
      discount: { text: discount },
      description: { text: desc },
    } = form;
    if (title?.length < 5) {
      setOpenModal(true);
      return setMsg((prev) => ({
        ...prev,
        title: "عنوان حداقل باید پنج حرف باشد",
      }));
    }
    if (price?.length < 1) {
      setOpenModal(true);
      return setMsg((prev) => ({
        ...prev,
        price: "فیلد قیمت نباید خالی باشد",
      }));
    }
    const features = [];
    form.features.reduce((prev, crr) => {
      crr.columns.map((item) => {
        if (item?.title?.length > 0 && item?.value?.length > 0) {
          features.push({ name: item?.title, value: item?.value });
        }
        return false;
      });
      return crr;
    }, 0);
    const formData = new FormData();
    const images = files.filter((item) => item.type === "image");
    const videos = files.filter((item) => item.type === "video");
    const body = {
      title: title.trim(),
      off: discount.trim(),
      price: price.trim(),
      text: desc.trim(),
      features,
      image_count: images.length - deletedImages.length,
      video_count: videos.length - deletedVideos.length,
    };
    if (productToken) {
      const deletedItems = deletedImages.concat(deletedVideos);
      const remainingImages = single?.product?.images
        .map((item) => {
          if (deletedItems.includes(item)) return item;
          return false;
        })
        .filter((item) => item);
      body.deletedImages = deletedItems;
      body.previousImages = remainingImages;
      body.product = productToken;
    }
    for (let i in images) {
      let b = +i + 1;
      formData.append(`image${b}`, images[i].file);
    }
    for (let i in videos) {
      let b = +i + 1;
      formData.append(`video${b}`, videos[i].file);
    }
    formData.append("body", JSON.stringify(body));
    await sendProduct(formData);
  };
  const cancel = () => {
    history.replace("/store");
  };
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const { single } = useSelector(({ product }) => product);
  const getSinglePost = async () => {
    if (productToken) {
      await setLoading(true);
      await dispatch(setSingleEditProduct(productToken));
      await setLoading(false);
    }
  };
  useEffect(() => {
    if (single?.product && productToken) {
      setForm((prev) => ({
        ...prev,
        title: { text: single?.product?.title, isValid: true },
        price: { text: single?.product?.price, isValid: true },
        discount: { text: single?.product?.off, isValid: true },
        description: { text: single?.product?.text, isValid: true },
        features:
          single?.product?.features?.length > 0
            ? single?.product?.features
            : prev.features,
        isFormValid: true,
      }));
      setFiles(single?.product?.images);
    }
  }, [productToken, single]);
  useEffect(() => {
    getSinglePost();
    return () => {
      if (productToken) dispatch(setProduct());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading && productToken)
    return <LodingDotPlus isFixed isRelative={false} />;
  return (
    <HasPageWrapper component={AdsLayout} isPage={isPage}>
      {isPage ? (
        <Helmet>
          <title>افزودن محصول جدید - اپلیکیشن شهری میرسه</title>
          <meta
            name="keywords"
            content={"افزودن محصول جدید - اپلیکیشن شهری میرسه"}
          ></meta>
        </Helmet>
      ) : null}
      {l ? <ModalConnection /> : null}
      <AddProductContext.Provider
        value={{
          submit,
          cancel,
          form,
          setForm,
          msg,
          setMsg,
          files,
          setFiles,
          count,
          setCount,
          deletedImages,
          deletedVideos,
          setDeletedVideos,
          setDeletedImages,
        }}
      >
        <Container>
          {openModal && (msg?.title || msg?.price) ? (
            <AuthAlert
              alert={{ title: " ", message: msg?.title || msg?.price }}
              go={() => setOpenModal(false)}
            />
          ) : null}
          {notifAlert?.mode === "successAddProduct" ||
          notifAlert?.code === 404 ? (
            <AuthAlert
              alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
              go={
                notifAlert?.mode === "successAddProduct"
                  ? () => history.push(`/store/product/${token}`)
                  : () => {}
              }
            />
          ) : null}
          <Form onSubmit={(e) => e.preventDefault()}>
            <AddProductForm />
          </Form>
        </Container>
      </AddProductContext.Provider>
    </HasPageWrapper>
  );
};

const Container = styled.div`
  color: white;
  /* margin-top: 50px; */
  direction: rtl;
`;

export default AddProduct;
