import * as types from "../actions/types";

const initialState = {
  post: null,
  loading: false,
  comments: null,
  myPosts: [],
  lastPostPosition: 0,
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LAST_POST_POSITION:
      return { ...state, lastPostPosition: action.payload };
    case types.SET_MY_POSTS:
      return { ...state, myPosts: action.payload };
    case types.GET_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case types.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default mediaReducer;
