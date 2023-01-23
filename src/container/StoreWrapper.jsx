/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  getProducts,
  setStoreSearch,
  setStoreSearchItems,
  setStoreSearchPage,
} from "store/actions/productAction";
import StoreContext from "context/StoreContext";
import usePath from "hooks/usePath";

const StoreWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { products, categories, page } = useSelector(({ product }) => product);
  const { authID, sessionID } = useSelector(({ auth }) => auth);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { token } = useParams();
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(true);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const splt = pathname.split("/");
    if (
      splt[1] === "store" &&
      splt[2] === "product" &&
      splt[3] === "" &&
      !splt.includes("search")
    ) {
      history.replace("/store");
    }
    if (!token && (products.length === 0 || categories.length === 0)) {
      setLoading(true);
      if (authID && authID.length > 0 && sessionID && sessionID.length > 0) {
        dispatch(setStoreSearchPage(page === 0 ? 1 : page));
        if (!splt.includes("search")) {
          dispatch(getProducts());
        }
      }
    } else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authID, sessionID]);
  useEffect(() => {
    const splt = pathname.split("/");
    if (splt.includes("search")) {
      setLoading(false);
    }
    return () => {
      dispatch(setStoreSearchPage(0));
      dispatch(setStoreSearchItems());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [firstClick, setFirstClick] = useState(false);
  const [l, setL] = useState(false);
  const { goReplace } = usePath();
  const handleSubmitSearch = async () => {
    if (search.trim().length === 0) return;
    if (l) return;
    goReplace(`/store/search/${search}`);
    await dispatch(setStoreSearchItems([]));
    await setMounted(false);
    await setL(true);
    await dispatch(setStoreSearch(search));
    setSearched(search);
    await setL(false);
  };
  return (
    <StoreContext.Provider
      value={{
        firstClick,
        setFirstClick,
        loading: l,
        setLoading: setL,
        search,
        setSearch,
        handleSubmitSearch,
        openModal,
        setOpenModal,
        searched,
        setSearched,
        mounted,
        setMounted,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreWrapper;
