/* eslint-disable no-unused-vars */
import MediaContext from "context/MediaContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  setHasCat,
  setMediaData,
  setMediaSearch,
  setMediaSearchItems,
} from "store/actions/mediaActions";

const MediaWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();
  const history = useHistory();
  const [lastPosition, setLastPosition] = useState(0);
  const { search: searchList } = useSelector(({ media }) => media);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [l, setL] = useState(false);
  const [searched, setSearched] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    const splt = pathname.split("/");
    if (splt[1] === "media" && splt[2] === "post" && splt[3] === "") {
      history.replace("/media");
    }
    return () => {
      // dispatch(setHasCat(false));
      // dispatch(setMediaData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   console.log(lastPosition);
  // }, [lastPosition]);
  const handleSubmitSearch = async () => {
    if (search.trim().length === 0) return;
    if (l) return;
    if (searchList?.length > 0 && search === searched) return;
    history.push(`/media/search/${search}`);
    await dispatch(setMediaSearchItems([]));
    await setMounted(false);
    await setL(true);
    await dispatch(setMediaSearch(search));
    setSearched(search);
    await setL(false);
  };
  return (
    <MediaContext.Provider
      value={{
        loading: l,
        setLoading: setL,
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
        setMounted,
        lastPosition,
        setLastPosition,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaWrapper;
