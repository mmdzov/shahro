/* eslint-disable no-unused-vars */
import FareContext from "context/FareContext";
import MediaContext from "context/MediaContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { setFareSearch, setFareSearchItems } from "store/actions/fareAction";
import {
  setHasCat,
  setMediaData,
  setMediaSearch,
  setMediaSearchItems,
} from "store/actions/mediaActions";

const FareWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [lastPosition, setLastPosition] = useState(0);
  const { search: searchList } = useSelector(({ fare }) => fare);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [l, setL] = useState(false);
  const [searched, setSearched] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [firstClick, setFirstClick] = useState(false);

  const handleSubmitSearch = async () => {
    if (search.trim().length === 0) return;
    if (l) return;
    if (searchList?.length > 0 && search === searched) return;
    history.push(`/rent/search/${search}`);
    await dispatch(setFareSearchItems([]));
    await setMounted(false);
    await setL(true);
    await dispatch(setFareSearch(search));
    setSearched(search);
    await setL(false);
  };
  return (
    <FareContext.Provider
      value={{
        loading: l,
        setLoading: setL,
        search,
        setSearch,
        handleSubmitSearch,
        openModal,
        setOpenModal,
        searched,
        firstClick,
        setFirstClick,
        setSearched,
        mounted,
        setMounted,
        lastPosition,
        setLastPosition,
      }}
    >
      {children}
    </FareContext.Provider>
  );
};

export default FareWrapper;
