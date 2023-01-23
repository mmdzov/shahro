/* eslint-disable react-hooks/exhaustive-deps */
import SearchTemplate from "components/SearchTemplate/SearchTemplate";
import StoreContext from "context/StoreContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoreSearch,
  setStoreSearchPage,
} from "store/actions/productAction";
const StoreSearch = () => {
  let { search: searchItems, searchPage } = useSelector(
    ({ product }) => product
  );
  const dispatch = useDispatch();
  const handleEndScroll = async (page, search) => {
    await dispatch(setStoreSearchPage(page));
    await dispatch(setStoreSearch(search, page));
  };
  return (
    <SearchTemplate
      list={searchItems}
      currentPage={searchPage}
      context={StoreContext}
      title="فروشگاه"
      mode="store"
      onEndScroll={handleEndScroll}
    />
  );
};
export default StoreSearch;
