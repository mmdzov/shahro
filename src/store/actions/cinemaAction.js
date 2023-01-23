import * as t from "./types";

export const setLoadingCinema = (loading = false) => ({
  type: t.SET_LOADING_CINEMA,
  payload: loading,
});

export const setHomeCinema = (cinema) => ({
  type: t.SET_HOME_CINEMA,
  payload: cinema,
});
