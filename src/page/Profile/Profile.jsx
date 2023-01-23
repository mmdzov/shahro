/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import ProfileHeader from "components/Profile/ProfileHeader";
import ProfileNav from "components/Profile/ProfileNav";
import ProfileContent from "components/Profile/ProfileContent";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  getProfile,
  setloadingAcc,
  setProfile,
  setProfilePage,
} from "store/actions/accountAction";
import { setLoading as sl, setSplash } from "store/actions/_MainAction";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useState } from "react";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";

const Profile = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const { profile, hasEndPage } = useSelector(({ account }) => account);
  const { splash, guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  const [isFetching, setIsFetching] = useInfiniteScroll();
  const [loading, setLoading] = useState(false);
  const getDatas = async () => {
    await setLoading(true);
    await dispatch(getProfile(id, token));
    await setLoading(false);
    await setIsFetching(false);
  };

  useEffect(() => {
    if (isFetching && !hasEndPage) {
      getDatas();
    }
  }, [isFetching]);
  useEffect(() => {
    return () => {
      dispatch(sl("", false));
      dispatch(setloadingAcc(false));
      dispatch(setSplash(false));
    };
  }, []);

  if (splash) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      {loading ? (
        <LodingDotPlus isRelative={false} isFixed isBg={false} />
      ) : null}
      <Helmet>
        <title>
          {profile?.account?.name ?? guestName} &#9679; اپلیکیشن شهری میرسه
        </title>
        <meta name="keywords" content={profile?.account?.name}></meta>
      </Helmet>
      <ProfileHeader />
      <ProfileNav />
      <ProfileContent />
    </Container>
  );
};

const Container = styled.div``;

export default memo(Profile);
