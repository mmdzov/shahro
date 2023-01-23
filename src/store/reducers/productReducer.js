import * as types from "../actions/types";

const INITIALSTATE = {
  homeProduct: [],
  loading: true,
  products: [],
  categories: [],
  cat: [],
  single: {},
  inFeature: {},
  basket: [],
  comments: {},
  basketCount: 0,
  totalPrice: 0,
  order: {},
  adsSliders: [],
  details: {},
  discount: { code: "0", value: 0, type: 0 },
  lastProductPosition: 0,
  myProducts: [],
  page: 0,
  hasEndSearch: false,
  search: [],
  searchPage: 0,
  searched: "",
  allowToCreate: false,
  commentForm: {},
};

const productReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_COMMENT_FORM:
      return { ...state, commentForm: action.payload };
    case types.SET_ALLOW_TO_CREATE_PRODUCT:
      return { ...state, allowToCreate: action.payload };
    case types.ADS_PAGE:
      return { ...state, page: action.payload };
    case types.SET_STORE_SEARCH:
      return { ...state, search: action.payload };
    case types.SET_STORE_SEARCH_PAGE:
      return { ...state, searchPage: action.payload };
    case types.HAS_END_SEARCH_STORE:
      return { ...state, hasEndSearch: action.payload };
    case types.SET_NEW_STORE_SEARCH:
      return { ...state, searched: action.payload };
    case types.SET_MY_PRODUCTS:
      return { ...state, myProducts: action.payload };
    case types.GET_LAST_PRODUCT_POSITION:
      return { ...state, lastProductPosition: action.payload };
    case types.SET_BASKET_DETAILS:
      return { ...state, details: action.payload };
    case types.SET_HOME_PRODUCT:
      return { ...state, homeProduct: action.payload };
    case types.SET_PRODUCT_LOADING:
      return { ...state, loading: true };
    case types.CLEAR_PRODUCT_LOADING:
      return { ...state, loading: false };
    case types.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case types.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case types.SET_SINGLE_CAT:
      return { ...state, cat: action.payload };
    case types.SET_SINGLE_PRODUCT:
      return { ...state, single: action.payload };
    case types.CLEAR_SINGLE_PRODUCT:
      return { ...state, single: {} };
    case types.SET_IN_FEATURE:
      return { ...state, inFeature: action.payload };
    case types.CLEAR_IN_FEATURE:
      return { ...state, inFeature: {} };
    case types.SET_LIKE:
      return { ...state, single: action.payload };
    case types.ADD_TO_BASKET:
      return { ...state, single: action.payload };
    case types.SET_BASKET_COUNT:
      return { ...state, basketCount: action.payload };
    case types.GET_BASKET:
      return { ...state, basket: action.payload };
    case types.CHANGE_BASKET_COUNT:
      return { ...state, basket: action.payload };
    case types.SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    case types.CLEAR_BASKET:
      return { ...state, basket: [] };
    case types.SET_COMMENTS:
      return { ...state, comments: action.payload };
    case types.SET_LIKE_COMMENT:
      return {
        ...state,
        comments: { ...state.comments, comments: action.payload },
      };
    case types.REPORT_COMMENT:
      return { ...state, comments: action.payload };
    case types.SUBMIT_COMMENT:
      return { ...state, comments: action.payload };
    case types.SET_ORDERS:
      return { ...state, order: action.payload };
    case types.SET_ADS_SLIDER:
      return { ...state, adsSliders: action.payload };
    case types.SET_DISCOUNT:
      return { ...state, discount: action.payload };
    case types.SET_SINGLE_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default productReducer;
