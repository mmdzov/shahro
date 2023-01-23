import * as types from "../actions/types";

const INITIALSTATE = {
  loading: true,
  account: {},
  image: "",
  sessions: {},
  profile: {},
  followers: [],
  followings: [],
  page: 0,
  location: {},
  locations: [],
  more: {},
  hasEndPage: false,
  profilePage: 0,
  lastProfilePosition: 0,
  homeAccounts: [],
  favorite: [],
  wallet: [],
  moreWallet: {},
  hasEndFavoritePage: false,
  profileTab: "main",
  followAccount: {},
};

const accountReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.FOLLOW_ACCOUNT:
      return { ...state, followAccount: action.payload };
    case types.SET_PROFILE_TAB:
      return { ...state, profileTab: action.payload };
    case types.HAS_END_FAVORITE_PAGE:
      return { ...state, hasEndFavoritePage: action.payload };
    case types.SET_MORE_WALLET:
      return { ...state, moreWallet: action.payload };
    case types.SET_WALLET:
      return { ...state, wallet: action.payload };
    case types.SET_FAVORITE:
      return { ...state, favorite: action.payload };
    case types.GET_HOME_ACCOUNTS:
      return { ...state, homeAccounts: action.payload };
    case types.GET_LAST_PROFILE_POSITION:
      return { ...state, lastProfilePosition: action.payload };
    case types.SET_PROFILE_PAGE:
      return { ...state, profilePage: action.payload };
    case types.HAS_END_PAGE:
      return { ...state, hasEndPage: action.payload };
    case types.SET_MORE_LOCATION:
      return { ...state, more: action.payload };
    case types.SET_LOADING_ACCOUNT:
      return { ...state, loading: action.payload };
    case types.SET_ACCOUNT:
      return { ...state, account: action.payload };
    case types.GET_ACCOUNT:
      return { ...state, account: action.payload };
    case types.UPDATE_ACCOUNT:
      return { ...state, account: action.payload };
    case types.ADD_PROFILE_IMAGE:
      return { ...state, image: action.payload };
    case types.GET_ACTIVE_SESSIONS:
      return { ...state, sessions: action.payload };
    case types.SESSION_KILL:
      return { ...state, sessions: action.payload };
    case types.SESSION_KILL_ALL:
      return { ...state, sessions: action.payload };
    case types.SESSION_KILL_ALLOTHER:
      return { ...state, sessions: action.payload };
    case types.SET_PROFILE:
      return { ...state, profile: action.payload };
    case types.SET_FOLLOWERS:
      return { ...state, followers: action.payload };
    case types.SET_FOLLOWINGS:
      return { ...state, followings: action.payload };
    case types.SET_FOLLOW_PAGE:
      return { ...state, page: action.payload };
    case types.ADD_LOCATION:
      return { ...state, location: action.payload };
    case types.ADD_LOCATIONS:
      return { ...state, locations: action.payload };
    case types.DELETE_LOCATION:
      return { ...state, locations: action.payload };
    case types.EDIT_LOCATION:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
};

export default accountReducer;
