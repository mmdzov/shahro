/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import AdsContext from "context/AdsContext";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  getAds,
  setAdsData,
  setAdsSearch,
  setAdsSearchItems,
  setPage,
} from "store/actions/adsAction";

const AdsWrapper = ({ children }) => {
  const { ads, page, search: searchList } = useSelector(({ ads }) => ads);
  const { authID, sessionID } = useSelector(({ auth }) => auth);
  const [search, setSearch] = useState("");
  const { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { token, adsId } = useParams();
  const [searched, setSearched] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [hasFilter, setHasFilter] = useState(false);
  const [lastPosition, setLastPosition] = useState(0);
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    const url1 = pathname.split("/").filter((item) => item);
    const isFilter = url1.includes("filter");
    setHasFilter(isFilter);
    if (isFilter) {
      dispatch(setAdsData([]));
      dispatch(setPage(1));
      console.log(token, ads.length, page, page, isFilter);
      console.log(authID, authID.length, sessionID, sessionID.length);
      if (
        authID &&
        authID.length > 0 &&
        sessionID &&
        sessionID.length > 0 &&
        !hasFirstLoaded
      ) {
        dispatch(setPage(page === 0 || page === -1 ? 1 : page));
        dispatch(getAds(setLoading, adsId));
        setHasFirstLoaded(true);
      }
    } else {
      // && ads.length === 0 && (page === 0 || page === -1) && url
      if (state?.from === "adsFilter") {
        dispatch(setAdsData([]));
        dispatch(setPage(1));
      }
      if (!token && ads.length === 0 && !pathname.includes("search")) {
        setLoading(true);
        dispatch(setPage(0));
        if (authID && authID.length > 0 && sessionID && sessionID.length > 0) {
          dispatch(setPage(page === 0 || page === -1 ? 1 : page));
          dispatch(getAds(setLoading));
        }
      } else setLoading(false);
    }
    return () => {
      if (isFilter) {
        setHasFirstLoaded(false);
        dispatch(setAdsData([]));
        dispatch(setPage(0));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, pathname, authID, sessionID, adsId, hasFilter]);
  useEffect(() => {
    const url1 = pathname.split("/").filter((item) => item);
    const isFilter = url1.includes("filter");
    if (isFilter) {
      dispatch(setPage(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFilter]);
  useEffect(() => {
    return () => {
      dispatch(setPage(1));
      dispatch(setAdsData([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const handleSubmitSearch = async () => {
    if (search.trim().length === 0) return;
    if (loading) return;
    if (searchList?.length > 0 && search === searched) return;
    history.push(`/ads/search/${search}`);
    await dispatch(setAdsSearchItems([]));
    await setMounted(false);
    await setLoading(true);
    await dispatch(setAdsSearch(search));
    setSearched(search);
    await setLoading(false);
  };
  return (
    <AdsContext.Provider
      value={{
        loading,
        setLoading,
        firstClick,
        setFirstClick,
        search,
        setSearch,
        handleSubmitSearch,
        openModal,
        setOpenModal,
        searched,
        setSearched,
        mounted,
        lastPosition,
        setLastPosition,
        setMounted,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

export default AdsWrapper;
