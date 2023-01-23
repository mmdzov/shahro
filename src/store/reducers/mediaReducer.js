import * as types from "../actions/types";

const initialState = {
  homeMedia: [],
  posts: null,
  sliders: null,
  categories: null,
  loading: true,
  postPage: 1,
  currentCategory: null,
  nextPage: ["data"],
  hasCat: false,
  allowToCreate: 0,
  search: [],
  searchPage: 0,
  searched: "",
  hasEndSearch: false,
  videotime: [],
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VIDEO_TIME:
      return { ...state, videotime: action.payload };
    case types.SET_ALLOW_TO_CREATE_MEDIA:
      return { ...state, allowToCreate: action.payload };
    case types.SET_POST_PAGE:
      return { ...state, postPage: action.payload };
    case types.SET_HAS_CATS:
      return { ...state, hasCat: action.payload };
    case types.SET_MEDIA_SEARCH:
      return { ...state, search: action.payload };
    case types.SET_MEDIA_SEARCH_PAGE:
      return { ...state, searchPage: action.payload };
    case types.HAS_END_MEDIA_SEARCH:
      return { ...state, hasEndSearch: action.payload };
    case types.SET_NEW_MEDIA_SEARCH:
      return { ...state, searched: action.payload };
    case types.GET_MEDIA_DATA:
      return {
        ...state,
        posts: action.payload.posts,
        sliders: action.payload.sliders,
        categories: action.payload.categories,
        currentCategory: action.payload.currentCategory,
        hasCat: action.payload.hasCat,
      };
    case types.SET_LOADING_MEDIA:
      return {
        ...state,
        loading: true,
      };
    case types.GET_MORE_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.payload.posts),
        postPage: state.postPage + 1,
        nextPage: action.payload.next,
        loading: false,
      };
    case types.GET_CATEGORY_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        currentCategory: action.payload.token,
        sliders: action.payload.sliders,
        nextPage: ["data"],
        postPage: 1,
        loading: false,
      };
    case types.SET_HOME_MEDIA:
      return { ...state, homeMedia: action.payload };
    case types.CLEAR_LOADING_MEDIA:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default mediaReducer;
