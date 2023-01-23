/* eslint-disable react-hooks/exhaustive-deps */
import SearchTemplate from "components/SearchTemplate/SearchTemplate";
import MediaContext from "context/MediaContext";
import { useDispatch, useSelector } from "react-redux";
import { setMediaSearch, setMediaSearchPage } from "store/actions/mediaActions";

const MediaSearch = () => {
  let { search: searchItems, searchPage } = useSelector(({ media }) => media);
  const dispatch = useDispatch();

  const handleEndScroll = async (page, search) => {
    await dispatch(setMediaSearchPage(page));
    await dispatch(setMediaSearch(search, page));
  };
  return (
    <SearchTemplate
      list={searchItems}
      currentPage={searchPage}
      context={MediaContext}
      title="رسانه"
      mode="media"
      onEndScroll={handleEndScroll}
    />
  );
};
export default MediaSearch;
