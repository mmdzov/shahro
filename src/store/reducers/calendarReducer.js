import currentDate from "utilities/currentDate";
import * as types from "../actions/types";

const cDate = currentDate;

const initialState = {
  homeCalendar: [],
  loading: true,
  gradient: {
    1: "grad-frvrdn",
    2: "grad-ordbhsht",
    3: "grad-khordad",
    4: "grad-tir",
    5: "grad-mordad",
    6: "grad-shrvr",
    7: "grad-mhr",
    8: "grad-aban",
    9: "grad-azar",
    10: "grad-dy",
    11: "grad-bhmn",
    12: "grad-sfnd",
  },
  openAlert: false,
  alert: null,
  posts: null,
  events: null,
  index: currentDate(1),
  time: { hours: 0, minutes: 0, seconds: 0 },
  date: { day: cDate(2), month: cDate(1), year: cDate(0) },
  selected: {},
  hasFirstTime: true,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_HAS_FIRST_TIME:
      return { ...state, hasFirstTime: action.payload };
    case types.SET_LOADING_CALENDAR:
      return {
        ...state,
        loading: true,
      };
    case types.CLEAR_LOADING_CALENDAR:
      return { ...state, loading: false };
    case types.GET_CALENDAR:
      return {
        ...state,
        events: action.payload.events,
        posts: action.payload.posts,
      };
    case types.SET_CALENDAR_EVENTS:
      return {
        ...state,
        events: action.payload.events,
      };
    case types.MODIFY_CALENDAR_EVENTS:
      return { ...state, events: action.payload };
    case types.SET_MONTH:
      return { ...state, index: action.payload };
    case types.CLEAR_MONTH:
      return { ...state, index: action.payload };
    case types.SET_CALENDAR_TIME:
      return { ...state, time: action.payload };
    case types.CLEAR_CALENDAR_TIME:
      return { ...state, time: state.time };
    case types.SET_CALENDAR_DATE:
      return { ...state, date: action.payload };
    case types.CLEAR_CALENDAR_DATE:
      return { ...state, date: action.payload };
    case types.GET_CALENDAR_EVENTS:
      return { ...state, events: action.payload };
    case types.EVENT_SELECTED:
      return { ...state, selected: action.payload };
    case types.CLEAR_CALENDAR_EVENTS:
      return { ...state, events: [] };
    case types.SET_HOME_CALENDAR:
      return { ...state, homeCalendar: action.payload };
    default:
      return state;
  }
};

export default calendarReducer;
