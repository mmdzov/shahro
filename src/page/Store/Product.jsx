import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProduct } from "store/actions/productAction";
import "./Product.css";
import { ProductContainer } from "components/Store/Product.styled";
import ProductIntro from "components/Store/ProductIntro";
import ProductSpecifications from "components/Store/ProductSpecifications";
import ProductComments from "components/Store/ProductComments";
import ProductSimilar from "components/Store/ProductSimilar";
import styled from "styled-components";
import useLoading from "hooks/useLoading";
import ProductBuy from "components/Store/ProductBuy";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import AuthAlert from "components/Utilities/AuthAlert";
import AddIcon from "components/Utilities/AddIcon";
import EditIcon from "@material-ui/icons/Edit";
import { clearErrMsg, setAlert, setErrMsg } from "store/actions/_MainAction";
import handleApiErrors from "utilities/handleApiErrors";
import AreYouSure from "components/Utilities/AreYouSure";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import Delete from "@material-ui/icons/Delete";
import DeleteIcon from "components/Utilities/DeleteIcon";
import storeService from "api/storeService";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";

const Product = () => {
  const { token } = useParams();
  const {
    single: { product: prod },
  } = useSelector(({ product }) => product);
  const { alert: notifAlert, loading: mainLoading } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const { loading } = useLoading(prod);
  const [colorName, setColorName] = useState({});
  const [size, setSize] = useState({
    name: prod?.sizes[0]?.name,
    token: prod?.sizes[0]?.token,
  });
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (prod) {
      if (prod.likeMe === 1) setLike(true);
      else setLike(false);
    }
  }, [prod]);
  const handleCb = (param) => {
    setModal(param);
  };
  useEffect(() => {
    if (token) {
      dispatch(setSingleProduct(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const history = useHistory();
  const [sureAlert, setSureAlert] = useState(false);
  const [l, setL] = useState(false);
  const handleDeleteProduct = async () => {
    await setSureAlert(false);
    await setL(true);
    dispatch(clearErrMsg());
    try {
      const data = await storeService.deleteSingleProduct(token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          if (alert.has === 1) {
            dispatch(
              setAlert({
                show: true,
                mode: "successDeleteProduct",
                title: alert.title,
                msg: alert.message,
                has: alert.has,
              })
            );
          }
        })
        .catch((e) => {
          dispatch(
            setAlert({
              show: true,
              mode: "errorDeleteProduct",
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
  if (mainLoading.mode === "storeToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <div
      className={`productWrapper homeSlideList ${modal ? "active" : ""}`}
      style={{ marginBottom: 0 }}
    >
      {sureAlert ? (
        <AreYouSure
          Icon={Delete}
          open={sureAlert}
          setOpen={setSureAlert}
          click={handleDeleteProduct}
          mode="delete"
        />
      ) : null}
      {l ? <ModalConnection /> : null}
      {notifAlert.mode === "errorDeleteProduct" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      {notifAlert.mode === "singleProduct" ||
      notifAlert.mode === "successDeleteProduct" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={() => history.replace("/store")}
        />
      ) : null}
      <Helmet>
        <title>{prod?.title}</title>
        <meta
          name="description"
          content={prod?.text
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            ?.split(".")
            ?.slice(0, 2)
            ?.join(".")
            .slice(0, 499)}
        ></meta>
        <meta name="keywords" content={prod?.title}></meta>
      </Helmet>
      {!loading && prod?.isMe === 1 ? (
        <DeleteIcon onClick={() => setSureAlert((prev) => !prev)} />
      ) : null}
      {!loading && prod?.isMe === 1 ? (
        <AddIcon
          Icon={EditIcon}
          style={{ bottom: 60 }}
          to={`/store/compose/${prod.token}`}
        />
      ) : null}
      <FlexibleContainer style={{ background: "transparent" }}>
        <ProductIntro
          modal={modal}
          colorName={colorName}
          setColorName={setColorName}
          like={like}
          setLike={setLike}
          size={size}
          setSize={setSize}
        />
        <div>
          {loading ? (
            <ProductSpecifications prod={prod} />
          ) : prod?.features?.length === 0 ? null : (
            <ProductSpecifications prod={prod} />
          )}
          <ProductComments setModal={handleCb} />
          {loading ? (
            <ProductSimilar
              setModal={setModal}
              color={colorName}
              modal={modal}
              size={size}
            />
          ) : prod?.relateds?.length === 0 ? null : (
            <ProductSimilar
              setModal={setModal}
              color={colorName}
              modal={modal}
              size={size}
            />
          )}
          <ProductBuy color={colorName} modal={modal} />
        </div>
      </FlexibleContainer>
    </div>
  );
};
const FlexibleContainer = styled(ProductContainer)`
  max-width: 1000px;
  margin-bottom: 10px;
  @media (max-width: 659px) {
    width: 100%;
  }
  @media (min-width: 660px) {
    margin-bottom: 0px;
    display: flex;
    width: 100%;
    padding: 0 10px;
    /* direction: ltr; */
    &:first-of-type {
      margin-bottom: 45px !important;
    }
    & > div {
      width: 50%;
      direction: rtl;
      height: max-content;
    }
    & > div:last-of-type {
      padding-right: 5px;
      /* padding-left: 5px; */
    }
  }
`;
export default Product;
