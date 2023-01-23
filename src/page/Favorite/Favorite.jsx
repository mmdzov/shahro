/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { memo, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getFavorite,
  setAccountPage,
  setFavorite,
  setHasEndFavoritePage,
} from "store/actions/accountAction";
import styled from "styled-components";
import FavoriteList from "components/Favorite/FavoriteList";
import FavoriteTab from "components/Favorite/FavoriteTab";
import usePath from "hooks/usePath";

const Favorite = () => {
  const { hasEndFavoritePage, page } = useSelector(({ account }) => account);
  const { getLastRoute } = usePath();
  const [mode, setMode] = useState("ads");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [endScroll, setEndScroll] = useInfiniteScroll();

  useEffect(() => {
    const mode = getLastRoute().state?.mode;
    if (mode) {
      setMode(mode);
    } else setMode("ads");
  }, [getLastRoute]);

  useEffect(() => {
    const position = getLastRoute().state?.position;
    if (position) {
      setTimeout(() => {
        window.scrollTo({ top: position, left: 0, behavior: "auto" });
      }, 0);
    }
  }, [mode]);

  const getData = async () => {
    await setLoading(true);
    await dispatch(getFavorite());
    await setLoading(false);
  };

  const getDataWhenScroll = async () => {
    if (hasEndFavoritePage) return;
    await getData();
    await setEndScroll(false);
  };
  const getSingleData = () => {
    if (page > 0) return;
    getData();
  };

  useEffect(() => {
    getSingleData();
    return () => {
      if (getLastRoute().state?.subFrom === "favorite") return;
      dispatch(setAccountPage(0));
      dispatch(setFavorite());
    };
  }, []);

  useEffect(() => {
    if (endScroll) {
      getDataWhenScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endScroll]);

  return (
    <Container>
      <Helmet>
        <title>{"علاقه مندی ها"} - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content={"علاقه مندی ها - اپلیکیشن شهری میرسه"}
        ></meta>
      </Helmet>
      <FavoriteTab mode={mode} setMode={setMode} />
      <FavoriteList mode={mode} loading={loading} />
    </Container>
  );
};

const Container = styled.div``;

export default Favorite;
