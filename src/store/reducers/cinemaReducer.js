import * as t from "../actions/types";

const INITIALSTATE = {
  homeCinema: [],
  loading: true,
};

const cinemaReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case t.SET_HOME_CINEMA:
      return { ...state, homeCinema: action.payload };
    case t.SET_LOADING_CINEMA:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default cinemaReducer;
