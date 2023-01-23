/* eslint-disable react-hooks/exhaustive-deps */
import Notification from "components/Notification/Notification";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "store/actions/notifAction";
import styled from "styled-components";
import LodingDotPlus from "../../components/Utilities/Loadings/LoadingDotPlus";
import { Helmet } from "react-helmet";

const Notifications = () => {
  const { page } = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isFetching, setF] = useInfiniteScroll();
  useEffect(() => {
    if (page === 0) {
      dispatch(getNotification());
    }
  }, []);
  const getMoreNotif = async () => {
    await setLoading(true);
    await dispatch(getNotification());
    await setF(false);
    await setLoading(false);
  };
  useEffect(() => {
    if (loading) return;
    if (isFetching) getMoreNotif();
  }, [isFetching]);

  return (
    <Container>
      <Helmet>
        <title>اعلان ها - اپلیکیشن شهری میرسه</title>
        <meta name="keywords" content="اعلان ها - اپلیکیشن شهری میرسه"></meta>
      </Helmet>
      {loading && <LodingDotPlus isRelative={false} isFixed isBg={false} />}
      <Notification />
    </Container>
  );
};

const Container = styled.div``;
export default Notifications;
