import EmptyBasket from "components/Basket/EmptyBasket";
import MediaOrderList from "components/MediaOrder/MediaOrderList";
import AuthAlert from "components/Utilities/AuthAlert";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import useLastPosition from "hooks/useLastPosition";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "store/actions/postAction";
import styled from "styled-components";
import MediaOrderBottomSheet from "../Media/MediaOrderBottomSheet";
const MediaOrder = () => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { myPosts, lastPostPosition } = useSelector(({ post }) => post);
  const [loading, setLoading] = useState(true);
  const r = useRef(null);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getMyPosts());
    await setLoading(false);
  };
  useLastPosition(lastPostPosition);
  const dispatch = useDispatch();
  useEffect(() => {
    if (myPosts.length === 0) {
      getDatas();
    } else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container ref={r}>
      <Helmet>
        <title>مطالب من - اپلیکیشن شهری میرسه</title>
        <meta name="keywords" content={"مطالب من - اپلیکیشن شهری میرسه"}></meta>
      </Helmet>
      {notifAlert.mode === "myPosts" || notifAlert.mode === "myPostsError" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
        />
      ) : null}
      {myPosts?.length === 0 ? (
        <EmptyBasket title="بدون مطلب" msg="درحال حاظر مطلبی ثبت نکردید" />
      ) : (
        <MediaOrderList />
      )}
      <MediaOrderBottomSheet />
    </Container>
  );
};

const Container = styled.div``;

export default MediaOrder;
