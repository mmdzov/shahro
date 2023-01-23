/* eslint-disable react-hooks/exhaustive-deps */
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import Splash from "page/Login/Splash";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { useLocation } from "react-router-dom";
import { getGuestToken } from "store/actions/authActions";
import { clearAlert, setSplash } from "store/actions/_MainAction";

const PrivateRoute = ({
  path,
  component: Component,
  redirectTo = "/login",
  loginRequired = false,
  exact,
  ...props
}) => {
  const { pathname } = useLocation();
  const { isLoggedOut } = useSelector(({ auth }) => auth);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const { authID, sessionID } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [a, setA] = useState({
    auth: "",
    session: "",
  });
  const questCallback = (auth, session) => {
    setA({
      auth,
      session,
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log(
  //     loading,
  //     a,
  //     authID,
  //     sessionID,
  //     pathname,
  //     notifAlert,
  //     isLoggedOut
  //   );
  // }, [loading, a, authID, sessionID, pathname, notifAlert, isLoggedOut]);
  const getDatas = async () => {
    const auth = await localStorage.getItem("authID");
    const session = await localStorage.getItem("sessionID");
    setA({
      auth,
      session,
    });
    if (!isLoggedOut && (!auth || !session)) {
      await dispatch(getGuestToken(questCallback));
    } else setLoading(false);
  };
  useEffect(() => {
    getDatas();
  }, [isLoggedOut]);

  useEffect(() => {
    const { auth, session } = a;
    if (authID && sessionID && authID.length > 0 && sessionID.length > 0) {
      setLoading(false);
    }
    if (auth && session && auth.length > 0 && session.length > 0) {
      setLoading(false);
    }
  }, [a, loading, authID, sessionID]);

  useEffect(() => {
    getDatas();
    const path = pathname.split("/");
    // const checkEmpty = path.every((item) => item === "" || !item);
    // if (checkEmpty) {
    //   setLoading(false);
    // }
    // if (path.length === 1 && path[0] === "/") {
    //   setLoading(false);
    // }
    return () => {
      if (path.length !== 1 && path[0] !== "/" && notifAlert.mode === "guest") {
        dispatch(clearAlert());
        dispatch(setSplash());
      }
    };
  }, [pathname]);
  if (loading && pathname.split("/").every((item) => item === ""))
    return <Splash isUser />;
  if (
    loading &&
    (!authID || authID?.length === 0) &&
    (!sessionID || sessionID.length === 0)
  )
    return <LodingDotPlus isRelative={false} isFixed />;

  return (
    <Route
      path={path}
      exact={exact || true}
      render={(props) => {
        return a.auth && a.session ? (
          <Component {...props} userProps={a} />
        ) : (
          loginRequired && <Redirect from={path} to={redirectTo} />
        );
      }}
      {...props}
    />
  );
};

export default memo(PrivateRoute);
