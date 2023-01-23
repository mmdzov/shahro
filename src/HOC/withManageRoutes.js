import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  setHasCat,
  setMediaData,
  setPostPage,
} from "store/actions/mediaActions";
import { setComments, setSinglePost } from "store/actions/postAction";
import { clearSingleProduct } from "store/actions/productAction";
const withManageRoutes = (Component) => (props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const has = (value) => {
    const cut = pathname.split("/").filter((item) => item);
    return cut.some((item) => item === value);
  };
  useEffect(() => {
    if (!has("profile") && !has("media")) {
      dispatch(setHasCat(false));
      dispatch(setMediaData());
      dispatch(setPostPage());
    }
    if (
      !has("profile") &&
      !has("followers") &&
      !has("followings") &&
      !has("media")
    ) {
      dispatch(setSinglePost());
      dispatch(setComments());
    }
    if (
      !has("profile") &&
      !has("product") &&
      !has("features") &&
      !has("comments") &&
      !has("add")
    ) {
      dispatch(clearSingleProduct());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return <Component {...props} />;
};

export default withManageRoutes;
