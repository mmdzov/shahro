import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProfile,
  setEndPage,
  setProfile,
  setProfilePage,
  setProfileTab,
} from "store/actions/accountAction";

const ProfileWrapper = ({ children }) => {
  const { profile, account } = useSelector(({ account }) => account);
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const [l, setL] = useState(true);

  const getData = async () => {
    try {
      await setL(true);
      await dispatch(setProfileTab("main"));
      await dispatch(getProfile(id, token));
      await setL(false);
    } catch (e) {}
  };

  const getDatas = async () => {
    await dispatch(setProfile());
    await dispatch(setProfileTab("main"));
    await dispatch(setProfilePage(0));
    await dispatch(setEndPage(false));
    await getData();
  };

  useEffect(() => {
    if (id !== account?.token && profile?.account?.token !== id) {
      window.scrollTo(0, 0);
      getDatas();
      console.log("test2");
    } else if (profile && Object.keys(profile)?.length === 0) {
      window.scrollTo(0, 0);
      console.log("test1");
      getData();
    } else {
      setL(false);
    }
    return () => {
      setL(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (l) return <LodingDotPlus isRelative={false} isFixed />;
  return <>{children}</>;
};

export default memo(ProfileWrapper);

// } else if (profile && Object.keys(profile)?.length === 0) {
