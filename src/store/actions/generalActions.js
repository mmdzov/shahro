import * as types from "./types";

export const closeAlert = () => {
  return {
    type: types.CLOSE_ALERT,
  };
};
export const setLoading = () => {
  return {
    type: types.SET_LOADING,
  };
};
export const showSplashAction = (splash = false) => ({
  type: types.SHOW_SPLASH,
  payload: splash,
});
