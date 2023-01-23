import * as types from "./types";
import authService from "api/authService";
import handleApiErrors from "utilities/handleApiErrors";
import { clearAlert, clearErrMsg, setErrMsg, setSplash } from "./_MainAction";
import { setAlert } from "./_MainAction";

export const setRedirectLogIn = () => {
  return {
    type: types.SET_REDIRECT_LOGIN,
  };
};

export const setAuthLoading = () => {
  return {
    type: types.SET_AUTH_LOADING,
  };
};

export const closeAuthAlert = () => {
  return {
    type: types.CLOSE_AUTH_ALERT,
  };
};

export const clearUser = () => ({
  type: types.CLEAR_USER,
  payload: {
    auth: "",
    session: "",
  },
});

export const isLoggedOut = (isTrue = false) => ({
  type: types.IS_LOGGED_OUT,
  payload: isTrue,
});

export const getGuestToken =
  (cb = () => {}) =>
  async (dispatch, getState) => {
    if (getState().auth.isLoggedOut) return;
    try {
      const data = await authService.guest();
      handleApiErrors(data)
        .then(
          ({
            result: { sessionID, authID },
            alert: { title, message: msg, has },
          }) => {
            localStorage.setItem("sessionID", sessionID);
            localStorage.setItem("authID", authID);
            cb(authID, sessionID);
            dispatch({
              type: types.SET_GUEST_TOKEN,
              payload: { session: sessionID, auth: authID },
            });
            dispatch(setAlert({ mode: "guest", title, msg, has, show: 1 }));
            dispatch(setSplash(true));
          }
        )
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (err) {
      dispatch(setErrMsg(err));
    }
  };

export const signIn = (phoneNumber) => async (dispatch) => {
  dispatch(clearAlert());
  dispatch(clearErrMsg());
  try {
    const data = await authService.signIn(phoneNumber);
    handleApiErrors(data)
      .then(
        ({
          result: { authID, verifyCode },
          alert: { title, message: msg, has },
        }) => {
          dispatch({ type: types.SIGN_IN, payload: { authID, verifyCode } });
          dispatch(setAlert({ mode: "signin", title, msg, has, show: 1 }));
          localStorage.removeItem("sessionID");
          localStorage.setItem("authID", authID);
        }
      )
      .catch((e) => {
        if (e.title === "ورود به سامانه" || e.title === "خطا در سرور") {
          dispatch(
            setAlert({
              mode: "signInError",
              title: e.title,
              msg: e.message,
              has: e.has,
              show: 1,
            })
          );
        } else {
          dispatch(setErrMsg(e));
        }
      });
  } catch (err) {
    dispatch(setErrMsg(err));
    console.log(err);
  }
};

export const sendVerifyCode = (code) => async (dispatch) => {
  dispatch(clearAlert());
  dispatch(clearErrMsg());
  try {
    const auth = await localStorage.getItem("authID");
    const data = await authService.sendVerifyCode(auth, code);
    handleApiErrors(data)
      .then(
        ({ result: { sessionID }, alert: { title, message: msg, has } }) => {
          localStorage.setItem("sessionID", sessionID);
          dispatch({ type: types.SEND_VERIFY_CODE, payload: sessionID });
          dispatch(setAlert({ mode: "verify", title, msg, has, show: 1 }));
        }
      )
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            mode: "verify",
            title: e.title,
            msg: e.message,
            has: e.has,
            show: 1,
          })
        );
      });
  } catch (err) {
    dispatch(setErrMsg(err));
  }
};
