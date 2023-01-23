import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import authReducer from "./authReducer";
import mediaReducer from "./mediaReducer";
import generalReducer from "./generalReducer";
import postReducer from "./postReducer";
import productReducer from "./productReducer";
import _MainReducer from "./_MainReducer";
import adsReducer from "./adsReducer";
import accountReducer from "./accountReducer";
import cinemaReducer from "./cinemaReducer";
import notifReducer from "./notifReducer";
import pathReducer from "./pathReducer";
import fareReducer from "./fareReducer";

export default combineReducers({
  _MainReducer: _MainReducer,
  calendar: calendarReducer,
  auth: authReducer,
  media: mediaReducer,
  general: generalReducer,
  post: postReducer,
  product: productReducer,
  ads: adsReducer,
  account: accountReducer,
  cinema: cinemaReducer,
  notification: notifReducer,
  path: pathReducer,
  fare: fareReducer,
});
