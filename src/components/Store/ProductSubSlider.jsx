import { Fragment } from "react";
import {
  Like,
  ProdSubSlider,
  ProdTitle,
  ProdTitleMuted,
  Share,
} from "./Product.styled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ProductRate from "./ProductRate";
import useLoading from "hooks/useLoading";
import ProductSubImg from "components/SlideTemp/ProductSubImg";
import AuthAlert from "components/Utilities/AuthAlert";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "store/actions/_MainAction";

const ProductSubSlider = ({ like, prod, onLike }) => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { loading } = useLoading(prod);
  const dispatch = useDispatch();
  const handleShare = () => {
    let inp = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(inp);
    inp.value = text;
    inp.select();
    document.execCommand("copy");
    document.body.removeChild(inp);
    dispatch(
      setAlert({
        title: " ",
        msg: "محصول با موفقیت کپی شد",
        show: true,
        has: 1,
        mode: "copyLink",
      })
    );
  };
  if (loading) return <ProductSubImg />;
  return (
    <Fragment>
      <ProdSubSlider>
        {notifAlert.mode === "productLike" || notifAlert.mode === "copyLink" ? (
          <AuthAlert
            alert={{ title: notifAlert?.title, message: notifAlert.msg }}
          />
        ) : null}
        <Like style={{ color: like ? "red" : "gray" }} onClick={onLike}>
          {!like ? <FavoriteBorderIcon /> : <FavoriteIcon />}
        </Like>
        <Share onClick={handleShare}>
          <ShareIcon />
        </Share>
      </ProdSubSlider>
      <ProdTitle>{prod?.title}</ProdTitle>
      <ProductRate />
      <ProdTitleMuted>{prod?.title}</ProdTitleMuted>
    </Fragment>
  );
};

export default ProductSubSlider;
