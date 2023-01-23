import * as types from "./types";

export const setPath =
  (path = {}) =>
  async (dispatch, getState) => {
    const prevPath = getState().path.prevPaths;
    const index = prevPath?.findIndex((item) => item.key === path?.key);
    if (path && prevPath[index]?.pathname !== path?.pathname) {
      prevPath.push(path);
    }
    if (path && Object.keys(path)?.length > 0) {
      await dispatch({ type: types.SET_PREV_PATH, payload: prevPath });
    }
  };

export const changePath = (path = []) => ({
  type: types.SET_PREV_PATH,
  payload: path,
});

// export const goBack = () => async (dispatch,getState) => {
//   const prevPath = getState().path.prevPaths;
//   if(prevPath.length === 0) return
// }
