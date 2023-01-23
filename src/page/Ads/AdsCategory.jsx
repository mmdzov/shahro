/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { InsertEmoticonSharp } from "@material-ui/icons";
import AdsCategoryList from "components/Ads/AdsCategoryList";
import SlideTemp from "components/SlideTemp/SlideTemp";
import SlideTempFullAdsCategoryLoader from "components/SlideTemp/SlideTempFullAdsCategoryLoader";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import useLoading from "hooks/useLoading";
import useSlideScroll from "hooks/useSlideScroll";
import { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, setPage } from "store/actions/adsAction";
import styled from "styled-components";

const AdsCategory = () => {
  const dispatch = useDispatch();
  const { categories, page } = useSelector(({ ads }) => ads);
  const { loading, setLoading } = useLoading(categories);
  const [f, setF] = useInfiniteScroll();
  // useEffect(() => {
  //   setLoading(true);
  //   if (f) {
  //     dispatch(setPage(page + 1));
  //     dispatch(getCategories());
  //   }
  // }, [f, setF]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setLoading(true);
  //   if (categories.length === 0) {
  //     dispatch(setPage(page === 0 ? 1 : page));
  //     dispatch(getCategories());
  //   }
  // }, []);
  const { token } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      dispatch(getCategories(token ? token : null, setLoading));
    } else dispatch(getCategories(null, setLoading));
  }, []);
  if (loading) return <SlideTempFullAdsCategoryLoader />;
  return (
    <CatsCotainer>
      <Helmet>
        <title>دسته بندی آگهی - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"دسته بندی آگهی - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      {categories?.map(({ items, name, token }) => (
        <SlideTemp
          data={items}
          // style={{ padding: "20px 10px" }}
          isBorderTop={false}
          key={~~(Math.random() * 99999999)}
          title={name}
          path={`/ads/category/${token}`}
          loading={false}
        >
          <AdsCategoryList list={items} />
        </SlideTemp>
      ))}
    </CatsCotainer>
  );
};
const CatsCotainer = styled.div``;
export default memo(AdsCategory);
