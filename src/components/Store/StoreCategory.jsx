import SlideTempFullLoader from "components/SlideTemp/SlideTempFullLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { setSingleCat } from "store/actions/productAction";
import StoreMain from "./StoreMain";

const StoreCategory = () => {
  const { cat, loading } = useSelector(({ product }) => product);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = pathname.split("/")[2];
    if (token && !token.includes("search"))
      dispatch(setSingleCat(token, history));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading) return <SlideTempFullLoader />;
  return <StoreMain prods={cat} />;
};

export default StoreCategory;
