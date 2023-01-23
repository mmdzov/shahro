import * as types from "../actions/types";

const initialState = {
  openAlert: false,
  alert: null,
  loading: false,
  showSplash: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
        openAlert: true,
        loading: false,
      };
    case types.CLOSE_ALERT:
      return {
        ...state,
        openAlert: false,
        alert: null,
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SHOW_SPLASH:
      return {
        ...state,
        showSplash: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
