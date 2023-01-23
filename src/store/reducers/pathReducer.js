import * as types from "../actions/types";

const INITIALSTATE = {
  prevPaths: [],
};

const pathReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case types.SET_PREV_PATH:
      return { ...state, prevPaths: action.payload };
    default:
      return state;
  }
};

export default pathReducer;
