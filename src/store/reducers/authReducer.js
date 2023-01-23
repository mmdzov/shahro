import * as types from "../actions/types";

const initialState = {
  loading: false,
  sessionID: localStorage.getItem("sessionID"),
  authID: localStorage.getItem("authID"),
  error: null,
  logout: false,
  openAlert: false,
  alert: null,
  redirectLogin: false,
  verifyCode: "",
  authAlert: null,
  guest: false,
  isLoggedOut: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_USER:
      return {
        ...state,
        authID: action.payload.auth,
        sessionID: action.payload.session,
      };
    case types.IS_LOGGED_OUT:
      return { ...state, isLoggedOut: action.payload };
    case types.SET_GUEST_TOKEN:
      return {
        ...state,
        loading: false,
        sessionID: action.payload.session,
        authID: action.payload.auth,
        guest: true,
      };
    case types.SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SET_REDIRECT_LOGIN:
      return {
        ...state,
        redirectLogin: true,
      };
    case types.SIGN_IN:
      return {
        ...state,
        authID: action.payload.authID,
        verifyCode: action.payload.verifyCode,
        loading: false,
      };
    case types.SEND_VERIFY_CODE:
      return {
        ...state,
        sessionID: action.payload,
        loading: false,
        guest: false,
      };
    case types.SET_AUTH_ALERT: {
      return {
        ...state,
        authAlert: action.payload,
      };
    }
    case types.CLOSE_AUTH_ALERT:
      return {
        ...state,
        authAlert: null,
      };
    default:
      return state;
  }
};

export default authReducer;
