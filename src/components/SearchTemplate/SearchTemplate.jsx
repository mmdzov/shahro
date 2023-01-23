/* eslint-disable react-hooks/exhaustive-deps */
import useInfiniteScroll from "hooks/useInfiniteScroll";
import usePath from "hooks/usePath";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPage } from "store/actions/adsAction";
import styled from "styled-components";
import SearchTemplateForm from "./SearchTemplateForm";
import SearchTemplateList from "./SearchTemplateList";

const SearchTemplate = ({
  list,
  currentPage,
  context: Context,
  title,
  mode = "",
  onEndScroll = () => {},
}) => {
  const { getLastRoute } = usePath();
  const { search, setLoading, setSearch, setMounted, searched, setSearched } =
    useContext(Context);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [endScroll, setEndScroll] = useInfiniteScroll();
  useEffect(() => {
    if (id && id.length > 0) {
      setSearched(id);
      setSearch(id);
    } else {
      setMounted(true);
    }
    return () => {
      dispatch(setPage(-1));
      setSearch("");
      setSearched("");
    };
  }, []);

  useEffect(() => {
    const lastRoute = getLastRoute();
    console.log(lastRoute);
    if (lastRoute?.state && lastRoute?.state?.fromSearch) {
      window.scrollTo(0, lastRoute?.state?.lastPosition);
    }
  }, []);

  const getDataWhenScroll = async () => {
    if (list?.length === 0) return setEndScroll(false);
    await setLoading(true);
    let page = currentPage;
    if (page === 0) page = 1;
    else if (page > 0) page++;
    await onEndScroll(page, search);
    await setLoading(false);
    await setEndScroll(false);
  };

  useEffect(() => {
    if (endScroll) {
      getDataWhenScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endScroll]);

  return (
    <Container>
      <Helmet>
        <title>
          جستجو {searched.length > 0 ? searched : title} - اپلیکیشن شهری میرسه
        </title>
        <meta
          name="keywords"
          content={`جستجو ${title} - اپلیکیشن شهری میرسه`}
        ></meta>
      </Helmet>
      <SearchTemplateForm context={Context} list={list} />
      <SearchTemplateList list={list} context={Context} mode={mode} />
    </Container>
  );
};

const Container = styled.div``;

export default SearchTemplate;
