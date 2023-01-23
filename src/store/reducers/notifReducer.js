import * as types from "../actions/types";

const INITIALSTATE = {
  bar: [],
  notification: [],
  loading: false,
  page: 0,
};

const notifReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_BAR:
      return { ...state, bar: action.payload };
    case types.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case types.SET_NOTIF_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_NOTIF_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default notifReducer;
