import isMobileDevice from "utilities/isMobileDevices";
import * as types from "./types";

export const setErrMsg = (err) => ({
  type: types.SET_ERR_MSG,
  payload: err,
});

export const clearErrMsg = () => ({
  type: types.CLEAR_ERR_MSG,
});

export const clearAlert = () => ({
  type: types.CLEAR_ALERT,
});

export const setAlert = (alert) => {
  return {
    type: types.ADD_ALERT,
    payload: alert,
  };
};

export const setProgressMode = (mode = "stop") => ({
  type: types.SET_PROGRESS_MODE,
  payload: mode,
});

export const setPreventModify = (data = []) => ({
  type: types.SET_PREVENT_MODIFY,
  payload: data,
});

export const addPreventModify = (addedData) => async (dispatch, getState) => {
  const { preventModify } = getState()?._MainReducer;
  preventModify.push(addedData);
  dispatch(setPreventModify(preventModify));
};

export const setLastScroll = (scroll = 0) => ({
  type: types.SET_LAST_SCROLL,
  payload: scroll,
});

export const setHasEndPages = (hasEnd = false) => ({
  type: types.HAS_END_PAGES,
  payload: hasEnd,
});

export const setLoading = (mode = "", on = false) => ({
  type: types.SET_MAIN_LOADING,
  payload: { mode: mode, on: on },
});

export const setDevice = () => {
  const result = isMobileDevice();
  return { type: types.SET_DEVICE, payload: result };
};

export const setSplash = (splash = false) => ({
  type: types.SET_SPLASH,
  payload: splash,
});

export const setAllowToCreate = (isAllow) => ({
  type: types.SET_ALLOW_TO_CREATE,
  payload: isAllow,
});

export const fastAlert = (alert = {}) => ({
  type: types.FAST_ALERT,
  payload: alert,
});

export const hasTouchScreenDevice = (has = true) => ({
  type: types.HAS_TOUCH_SCREEN_DEVICE,
  payload: has,
});

export const changeGuestName = (name = "مهمان") => ({
  type: types.CHANGE_GUEST_NAME,
  payload: name,
});
