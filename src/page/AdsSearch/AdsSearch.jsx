/* eslint-disable react-hooks/exhaustive-deps */
import SearchTemplate from "components/SearchTemplate/SearchTemplate";
import AdsContext from "context/AdsContext";
import { useDispatch, useSelector } from "react-redux";
import { setAdsSearch, setAdsSearchPage } from "store/actions/adsAction";

const AdsSearch = () => {
  let { search: searchItems, searchPage } = useSelector(({ ads }) => ads);
  const dispatch = useDispatch();
  const handleEndScroll = async (page, search) => {
    await dispatch(setAdsSearchPage(page));
    await dispatch(setAdsSearch(search, page));
  };
  return (
    <SearchTemplate
      list={searchItems}
      currentPage={searchPage}
      context={AdsContext}
      title="آگهی های دست دوم"
      mode="ads"
      onEndScroll={handleEndScroll}
    />
  );
};

export default AdsSearch;
