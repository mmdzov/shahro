import * as types from "../actions/types";

const INITIALSTATE = {
  homeAds: [],
  loading: true,
  ads: [],
  cats: [],
  adsSingle: {},
  categories: [],
  order: [],
  fields: [],
  page: 0,
  hasEndSearch: false,
  adsCategory: {},
  search: [],
  searchPage: 0,
  searched: "",
  allowToCreate: false,
  subCategory: [],
};

const adsReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_SUBCATEGORY_ADS:
      return { ...state, subCategory: action.payload };
    case types.SET_ALLOW_TO_CREATE_ADS:
      return { ...state, allowToCreate: action.payload };
    case types.SET_ADS_CATEGORY:
      return { ...state, adsCategory: action.payload };
    case types.GET_ADS_FIELDS:
      return { ...state, fields: action.payload };
    case types.SET_HOME_ADS:
      return { ...state, homeAds: action.payload };
    case types.SET_ADS_LOADING:
      return { ...state, loading: true };
    case types.CLEAR_ADS_LOADING:
      return { ...state, loading: false };
    case types.GET_ADS:
      return { ...state, ads: action.payload };
    case types.GET_CATS:
      return { ...state, cats: action.payload };
    case types.UPDATE_ADS:
      return { ...state, ads: action.payload };
    case types.ADS_SINGLE:
      return { ...state, adsSingle: action.payload };
    case types.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case types.ADS_PAGE:
      return { ...state, page: action.payload };
    case types.SET_ADS_SEARCH:
      return { ...state, search: action.payload };
    case types.SET_ADS_SEARCH_PAGE:
      return { ...state, searchPage: action.payload };
    case types.HAS_END_SEARCH:
      return { ...state, hasEndSearch: action.payload };
    case types.SET_NEW_ADS_SEARCH:
      return { ...state, searched: action.payload };
    case types.SET_ADS_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default adsReducer;
