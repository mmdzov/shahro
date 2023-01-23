import * as types from "../actions/types";

const INITIALSTATE = {
  homeFares: [],
  fares: [],
  fare: {},
  loading: true,
  search: [],
  searchPage: 0,
  allowToCreate: 0,
  searched: "",
  hasEndSearch: false,
};

const fareReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_ALLOW_TO_CREATE_FARE:
      return { ...state, allowToCreate: action.payload };
    case types.SET_FARE_SEARCH:
      return { ...state, search: action.payload };
    case types.SET_FARE_SEARCH_PAGE:
      return { ...state, searchPage: action.payload };
    case types.HAS_END_FARE_SEARCH:
      return { ...state, hasEndSearch: action.payload };
    case types.SET_NEW_FARE_SEARCH:
      return { ...state, searched: action.payload };
    case types.SET_FARE:
      return { ...state, fare: action.payload };
    case types.SET_FARES:
      return { ...state, fares: action.payload };
    case types.SET_HOME_FARE:
      return { ...state, homeFares: action.payload };
    case types.SET_FARE_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default fareReducer;
