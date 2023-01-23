/* eslint-disable react-hooks/exhaustive-deps */
import SearchTemplate from "components/SearchTemplate/SearchTemplate";
import FareContext from "context/FareContext";
import { useDispatch, useSelector } from "react-redux";
import { setFareSearch, setFareSearchPage } from "store/actions/fareAction";

const FareSearch = () => {
  let { search: searchItems, searchPage } = useSelector(({ fare }) => fare);
  const dispatch = useDispatch();

  const handleEndScroll = async (page, search) => {
    await dispatch(setFareSearchPage(page));
    await dispatch(setFareSearch(search, page));
  };

  return (
    <SearchTemplate
      list={searchItems}
      currentPage={searchPage}
      context={FareContext}
      title="کرایه"
      mode="fare"
      onEndScroll={handleEndScroll}
    />
  );
};
export default FareSearch;
