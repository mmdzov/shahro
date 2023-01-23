import * as types from "../actions/types";

const error = () => ({
  type: "",
  has: 0,
  title: "",
  message: "",
  code: 0,
});

const alert = () => ({
  msg: "",
  title: "",
  code: 0,
  mode: "",
  show: false,
  isMobileDevice: false,
  splash: false,
});

const INITIALSTATE = {
  loading: { mode: "", on: false },
  error: error(),
  alert: alert(),
  allowToCreate: 0,
  fastAlert: {},
  hasEndPages: false,
  lastScroll: 0,
  progressMode: "stop",
  preventModify: [],
  hasTouchScreen: false,
  guestName: "مهمان",
};

const _MainReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_PROGRESS_MODE:
      return { ...state, progressMode: action.payload };
    case types.CHANGE_GUEST_NAME:
      return { ...state, guestName: action.payload };
    case types.HAS_TOUCH_SCREEN_DEVICE:
      return { ...state, hasTouchScreen: action.payload };
    case types.SET_PREVENT_MODIFY:
      return { ...state, preventModify: action.payload };
    case types.SET_LAST_SCROLL:
      return { ...state, lastScroll: action.payload };
    case types.HAS_END_PAGES:
      return { ...state, hasEndPages: action.payload };
    case types.FAST_ALERT:
      return { ...state, fastAlert: action.payload };
    case types.SET_ALLOW_TO_CREATE:
      return { ...state, allowToCreate: action.payload };
    case types.SET_ERR_MSG:
      return { ...state, error: action.payload };
    case types.CLEAR_ERR_MSG:
      return { ...state, error: error() };
    case types.ADD_ALERT:
      return { ...state, alert: action.payload };
    case types.CLEAR_ALERT:
      return { ...state, alert: alert() };
    case types.SET_MAIN_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_DEVICE:
      return { ...state, isMobileDevice: action.payload };
    case types.SET_SPLASH:
      return { ...state, splash: action.payload };
    default:
      return state;
  }
};
export default _MainReducer;
