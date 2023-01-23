import fareService from "api/fareService";
import handleApiErrors from "utilities/handleApiErrors";
import * as types from "./types";
import { clearErrMsg, setAlert, setErrMsg } from "./_MainAction";

export const setFare = (fare = {}) => ({
  type: types.SET_FARE,
  payload: fare,
});

export const setFareLoading = (loading = true) => ({
  type: types.SET_FARE_LOADING,
  payload: loading,
});

export const setHomeFare = (homeFare = []) => ({
  type: types.SET_HOME_FARE,
  payload: homeFare,
});

export const setFares = (fares = []) => ({
  type: types.SET_FARES,
  payload: fares,
});

export const setAllowToCreateFare = (isAllow = 0) => ({
  type: types.SET_ALLOW_TO_CREATE_FARE,
  payload: isAllow,
});

export const getFares = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  try {
    const data = await fareService.getFares();
    handleApiErrors(data)
      .then(({ result, alert }) => {
        dispatch(setFares(result?.rents));
        dispatch(setAllowToCreateFare(result?.allowToCreate));
        if (alert?.has === 1) {
          dispatch(
            setAlert({
              show: true,
              has: 1,
              msg: alert?.message,
              title: alert?.title,
              mode: "getFares",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        if (e?.has === 1) {
          dispatch(
            setAlert({
              show: true,
              has: 1,
              msg: e?.message,
              title: e?.title,
              mode: "errorGetFares",
            })
          );
        }
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const getSingleFare =
  (token, goReplace = () => {}) =>
  async (dispatch) => {
    dispatch(clearErrMsg());
    try {
      const data = await fareService.getSingleFare(token);
      handleApiErrors(data)
        .then(({ result, alert }) => {
          const slides = result?.slides.map((item) => {
            return {
              image: item,
              token: ~~(Math.random() * 999999),
              error: false,
            };
          });
          result.slides = slides;
          console.log(result);
          if (alert.has === 1) {
            dispatch(
              setAlert({
                mode: "singleFare",
                has: 1,
                show: true,
                msg: alert?.message,
                title: alert?.title,
              })
            );
          }
          // dispatch(setFare(result?.rent));
          dispatch(setFare(result));
        })
        .catch((e) => {
          goReplace("/rent");
          if (e.has === 1) {
            dispatch(
              setAlert({
                mode: "singleFare",
                has: 1,
                show: true,
                msg: e?.message,
                title: e?.title,
              })
            );
          }
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setFareSearchItems = (item = []) => ({
  type: types.SET_FARE_SEARCH,
  payload: item,
});

export const setFareSearchPage = (page) => ({
  type: types.SET_FARE_SEARCH_PAGE,
  payload: page,
});

export const setHasEndFareSearch = (isTrue = false) => ({
  type: types.HAS_END_FARE_SEARCH,
  payload: isTrue,
});

export const setNewFareSearched = (params) => ({
  type: types.SET_NEW_FARE_SEARCH,
  payload: params,
});

export const setFareSearch =
  (q, searchPage = 1) =>
  async (dispatch, getState) => {
    const { search, searched } = getState().fare;
    // if (hasEndFareSearch) return;
    dispatch(clearErrMsg());
    // if (q !== searched) {
    // dispatch(setNewFareSearched(q));
    // }
    try {
      const data = await fareService.fareSearch({
        searchPage,
        q,
      });
      handleApiErrors(data)
        .then(({ result }) => {
          // if (result?.rents.length === 0) return dispatch(setHasEndSearch(true));
          if (searched === q) {
            if (searchPage === 1) {
              dispatch(setFareSearchItems(result?.ads ?? []));
            } else {
              const datas = [...search];
              datas.push(...(result?.ads ?? ""));
              dispatch(setFareSearchItems(datas));
            }
            dispatch(setFareSearchPage(searchPage));
          } else {
            dispatch(setFareSearchPage(1));
            dispatch(setFareSearchItems(result?.ads ?? []));
            dispatch(setNewFareSearched(q));
          }
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };
