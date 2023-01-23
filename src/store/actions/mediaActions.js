import * as types from "./types";
import {
  clearErrMsg,
  // setAlert,
  setErrMsg,
} from "./_MainAction";
import postService from "api/postService";
import handleApiErrors from "utilities/handleApiErrors";

export const setHomeMedia = (params) => ({
  type: types.SET_HOME_MEDIA,
  payload: params,
});

export const setHasCat = (hasCat) => ({
  type: types.SET_HAS_CATS,
  payload: hasCat,
});

export const setMediaSearchItems = (item = []) => ({
  type: types.SET_MEDIA_SEARCH,
  payload: item,
});

export const setMediaSearchPage = (page) => ({
  type: types.SET_MEDIA_SEARCH_PAGE,
  payload: page,
});

export const setHasEndMediaSearch = (isTrue = false) => ({
  type: types.HAS_END_MEDIA_SEARCH,
  payload: isTrue,
});

export const setNewMediaSearched = (params) => ({
  type: types.SET_NEW_MEDIA_SEARCH,
  payload: params,
});

export const setVideoTime = (videotime) => ({
  type: types.SET_VIDEO_TIME,
  payload: videotime,
});

export const setMediaSearch =
  (q, searchPage = 1) =>
  async (dispatch, getState) => {
    const { search, searched } = getState().media;
    // if (hasEndMediaSearch) return;
    dispatch(clearErrMsg());
    // if (q !== searched) {
    // dispatch(setNewMediaSearched(q));
    // }
    try {
      const data = await postService.mediaSearch({
        searchPage,
        q,
      });
      handleApiErrors(data)
        .then(({ result }) => {
          // if (result?.posts.length === 0) return dispatch(setHasEndSearch(true));
          if (searched === q) {
            if (searchPage === 1) {
              dispatch(setMediaSearchItems(result?.ads ?? []));
            } else {
              const datas = [...search];
              datas.push(...(result?.ads ?? ""));
              dispatch(setMediaSearchItems(datas));
            }
            dispatch(setMediaSearchPage(searchPage));
          } else {
            dispatch(setMediaSearchPage(1));
            dispatch(setMediaSearchItems(result?.ads ?? []));
            dispatch(setNewMediaSearched(q));
          }
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setMediaData = (
  posts = null,
  sliders = null,
  categories = null,
  currentCategory = null,
  loading = false,
  hasCat = false
) => ({
  type: types.GET_MEDIA_DATA,
  payload: {
    posts,
    sliders,
    categories,
    currentCategory,
    loading,
    hasCat,
  },
});

export const allowToCreateMedia = (isAllow = 0) => ({
  type: types.SET_ALLOW_TO_CREATE_MEDIA,
  payload: isAllow,
});

export const getMediaData = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  const { posts, sliders, currentCategory } = getState().media;
  try {
    console.log("Test");
    if (
      currentCategory &&
      sliders &&
      posts &&
      currentCategory.length > 0 &&
      (sliders.length > 0 || posts.length > 0)
    )
      return;
    const data = await postService.getMediaData();
    handleApiErrors(data)
      .then(
        ({ result: { posts, sliders, categories, allowToCreate }, alert }) => {
          dispatch(setMediaData(posts, sliders, categories));
          if (alert.has === 1) {
            dispatch({
              type: types.SET_ALERT,
              payload: alert,
            });
          }
        }
      )
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};

export const setPostPage = (page = 0) => ({
  type: types.SET_POST_PAGE,
  payload: page,
});

export const getMorePosts =
  (postPage, catToken, history) => async (dispatch) => {
    try {
      let res = {};
      const data = await postService.getMorePosts({
        postPage: postPage,
        postCategory: catToken,
      });
      handleApiErrors(data)
        .then(({ result, alert }) => {
          res = result;
          if (alert.has === 1) {
            dispatch({
              type: types.SET_ALERT,
              payload: alert,
            });
          }
        })
        .catch((e) => {
          history.replace("/media");
          dispatch(setErrMsg(e));
        });
      const data1 = await postService.getMorePosts({
        postPage: postPage + 1,
        postCategory: catToken,
      });
      handleApiErrors(data1)
        .then(({ result: res2, alert }) => {
          dispatch({
            type: types.GET_MORE_POSTS,
            payload: {
              posts: res.posts,
              next: res2.posts,
            },
          });
          if (alert?.has === 1) {
            dispatch({
              type: types.SET_ALERT,
              payload: alert,
            });
          }
        })
        .catch((e) => {
          // dispatch(
          //   setAlert({
          //     show: true,
          //     mode: "mediaCategory",
          //     title: e.title,
          //     msg: e.message,
          //   })
          // );
          dispatch(setErrMsg(e));
        });
    } catch (err) {
      dispatch(setErrMsg(err));
      dispatch({
        type: types.GET_ERROR,
        payload: err,
      });
    }
  };

export const changeCategory =
  (catToken, history) => async (dispatch, getState) => {
    if (getState().media.hasCat) return;
    dispatch(clearErrMsg());
    try {
      const data = await postService.getMorePosts({
        postPage: 1,
        postCategory: catToken,
      });
      handleApiErrors(data)
        .then(({ result, alert }) => {
          dispatch(allowToCreateMedia(result?.allowToCreate));
          dispatch(setHasCat(true));
          dispatch({
            type: types.GET_CATEGORY_POSTS,
            payload: {
              posts: result?.posts,
              token: catToken,
              sliders: result?.sliders,
            },
          });
          if (alert?.has === 1) {
            dispatch({
              type: types.SET_ALERT,
              payload: alert,
            });
          }
        })
        .catch((e) => {
          // dispatch(
          //   setAlert({
          //     show: true,
          //     mode: "mediaCategory",
          //     title: e.title,
          //     msg: e.message,
          //   })
          // );
          history.replace("/media");
          dispatch(setErrMsg(e));
        });
    } catch (err) {
      dispatch(setErrMsg(err));
      dispatch({
        type: types.GET_ERROR,
        payload: err,
      });
    }
  };

export const setLoadingMedia = () => {
  return {
    type: types.SET_LOADING_MEDIA,
  };
};

export const clearLoadingMedia = () => ({
  type: types.CLEAR_LOADING_MEDIA,
});
