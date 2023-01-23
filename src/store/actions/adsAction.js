import adsService from "api/adsService";
import handleApiErrors from "utilities/handleApiErrors";
import * as types from "./types";
import { clearErrMsg, setAlert, setErrMsg } from "./_MainAction";

export const setHomeAds = (params) => ({
  type: types.SET_HOME_ADS,
  payload: params,
});

export const allowToCreateAds = (isAllow = false) => ({
  type: types.SET_ALLOW_TO_CREATE_ADS,
  payload: isAllow,
});

export const setAdsLoading = () => ({
  type: types.SET_ADS_LOADING,
});

export const clearAdsLoading = () => ({
  type: types.CLEAR_ADS_LOADING,
});

export const updateAds = (ads) => ({
  type: types.UPDATE_ADS,
  payload: ads,
});

export const setAdsCategory = (cat = {}) => ({
  type: types.SET_ADS_CATEGORY,
  payload: cat,
});

export const setPage = (page) => ({
  type: types.ADS_PAGE,
  payload: page,
});

export const clearCategory = () => ({
  type: types.SET_CATEGORIES,
  payload: [],
});

export const setSingleAds = (data = {}) => ({
  type: types.ADS_SINGLE,
  payload: data,
});

export const clearSingleAds = () => ({
  type: types.ADS_SINGLE,
  payload: {},
});

export const setAdsSearchItems = (item = []) => ({
  type: types.SET_ADS_SEARCH,
  payload: item,
});
export const setAdsSearchPage = (page) => ({
  type: types.SET_ADS_SEARCH_PAGE,
  payload: page,
});

export const setHasEndSearch = (isTrue = false) => ({
  type: types.HAS_END_SEARCH,
  payload: isTrue,
});

export const setAdsOrder = (order) => ({
  type: types.SET_ADS_ORDER,
  payload: order,
});

export const getAdsOrder = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await adsService.adsOrder();
    handleApiErrors(data)
      .then(({ result: { orders, allowToCreate }, alert }) => {
        dispatch(setAdsOrder(orders));
        dispatch(allowToCreateAds(allowToCreate));
        if (alert.has === 1) {
          dispatch(
            setAlert({
              mode: "adsOrder",
              show: true,
              title: alert.title,
              msg: alert.message,
              has: alert.has,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          setAlert({
            mode: "adsOrderError",
            show: true,
            title: e.title,
            msg: e.message,
            has: e.has,
          })
        );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setNewAdsSearched = (params) => ({
  type: types.SET_NEW_ADS_SEARCH,
  payload: params,
});

export const setAdsSearch =
  (q, searchPage = 1) =>
  async (dispatch, getState) => {
    const { search, searched } = getState().ads;
    // if (hasEndSearch) return;
    dispatch(clearErrMsg());
    // if (q !== searched) {
    // dispatch(setNewAdsSearched(q));
    // }
    try {
      const data = await adsService.adsSearch({
        searchPage,
        q,
      });
      handleApiErrors(data)
        .then(({ result }) => {
          // if (result?.ads.length === 0) return dispatch(setHasEndSearch(true));
          if (searched === q) {
            if (searchPage === 1) {
              dispatch(setAdsSearchItems(result?.ads ?? []));
            } else {
              const datas = [...search];
              datas.push(...(result?.ads ?? ""));
              dispatch(setAdsSearchItems(datas));
            }
            dispatch(setAdsSearchPage(searchPage));
          } else {
            dispatch(setAdsSearchPage(1));
            dispatch(setAdsSearchItems(result?.ads ?? []));
            dispatch(setNewAdsSearched(q));
          }
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const getSingleAds = (token) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const data = await adsService.singleAds(token);
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
        dispatch({ type: types.ADS_SINGLE, payload: result });
        dispatch(clearAdsLoading());
      })
      .catch((e) => {
        dispatch(clearAdsLoading());
        dispatch(clearErrMsg());
        dispatch(
          setAlert({
            mode: "singleAds",
            show: true,
            title: e.title,
            msg: e.message,
            has: e.has,
          })
        );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    // throw new Error(e);
  }
};
export const getEditAds = (token) => async (dispatch) => {
  try {
    dispatch(setAdsLoading());
    const data = await adsService.editAds(token);
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
        dispatch({ type: types.ADS_SINGLE, payload: result });
        dispatch(clearAdsLoading());
      })
      .catch((e) => {
        dispatch(clearAdsLoading());
        dispatch(clearErrMsg());
        dispatch(
          setAlert({
            mode: "getEditAds",
            show: true,
            title: e.title,
            msg: e.message,
            has: e.has,
          })
        );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    // throw new Error(e);
  }
};

export const setAdsData = (data = []) => ({
  type: types.GET_ADS,
  payload: data,
});

export const getAdsCatsCompose =
  (category = null) =>
  async (dispatch) => {
    dispatch(clearErrMsg());
    try {
      const data = await adsService.getComposeCategory(category);
      handleApiErrors(data).then(({ result: { categories } }) => {
        dispatch({ type: types.GET_CATS, payload: categories });
      });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setAdsFields = (fields) => ({
  type: types.GET_ADS_FIELDS,
  payload: fields,
});

export const getAdsFields = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await adsService.getComposeFields();
    handleApiErrors(data)
      .then(({ result }) => {
        const changedFields = result?.fields?.map((item) => {
          item.id = ~~(Math.random() * 9999);
          item.invalid = false;
          item.value = "";
          if (item?.type === "select") {
            item.options = item?.options.map((item) => {
              return { name: item, id: ~~(Math.random() * 9999) };
            });
            item.selected = {
              name: "انتخاب کنید",
              id: ~~(Math.random() * 9999),
            };
          }
          return item;
        });
        dispatch(setAdsFields(changedFields));
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setAllowToCreateAds = (isAllow = 0) => ({
  type: types.SET_ALLOW_TO_CREATE_ADS,
  payload: isAllow,
});

export const getAds =
  (loading = () => {}, token) =>
  async (dispatch, getState) => {
    const { page, ads: adss } = getState().ads;
    if (page < 0) return;
    try {
      loading(true);
      let params;
      if (token) {
        params = { adsCategory: token, adsPage: page };
      } else {
        params = { adsCategory: "", adsPage: page };
      }
      const data = await adsService.getAds(params);
      handleApiErrors(data)
        .then(({ result: { ads, allowToCreate, category }, result }) => {
          dispatch(setAllowToCreateAds(allowToCreate));
          if (category && Object.keys(category)?.length > 0) {
            dispatch(setAdsCategory(category));
          }
          if (ads.length === 0) {
            loading(false);
            dispatch(setPage(-1));
            return;
          }
          ads.forEach((item) => (item.error = false));
          if (page > 1) {
            const ad = [...adss];
            ad.push(...ads);
            dispatch(setAdsData(ad));
            loading(false);
          } else {
            dispatch(setAdsData(ads));
            loading(false);
          }
        })
        .catch((e) => {
          loading(false);
          dispatch(clearErrMsg());
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      loading(false);
      dispatch(setErrMsg(e));
    }
  };

export const setAdsSubCategory = (subcategory = []) => ({
  type: types.SET_SUBCATEGORY_ADS,
  payload: subcategory,
});

export const getAdsSubCategory = (category) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  try {
    const data = await adsService.getAdsSubCategory(category);
    handleApiErrors(data)
      .then(({ result, alert: { message, title, has } }) => {
        console.log(result);
        dispatch(setAdsSubCategory(result?.categories));
        if (has === 1) {
          dispatch(
            setAlert({
              mode: "adsSubCategory",
              show: true,
              has: 1,
              msg: message,
              title,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        if (e?.has === 1) {
          dispatch(
            setAlert({
              mode: "adsSubCategory",
              show: true,
              has: 1,
              msg: e.message,
              title: e.title,
            })
          );
        }
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const getCategories =
  (token, loading = () => {}) =>
  async (dispatch, getState) => {
    loading(true);
    try {
      let data;
      if (token) {
        data = await adsService.getCategoriesWithToken(token);
      } else {
        data = await adsService.getCategories();
      }
      handleApiErrors(data)
        .then(({ result: { categories } }) => {
          const cats = categories?.map((item) => {
            let p = item.items.map((item) => {
              return {
                ...item,
                id: ~~(Math.random() * 999999),
                error: false,
              };
            });
            item.items = p;
            return { ...item };
          });
          dispatch({ type: types.GET_CATEGORIES, payload: cats });
          loading(false);
        })
        .catch((e) => {
          loading(false);
          dispatch(clearErrMsg());
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      loading(false);
      throw new Error(e);
    }
  };
