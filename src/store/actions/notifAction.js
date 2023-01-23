import notificationService from "api/notificationService";
import handleApiErrors from "utilities/handleApiErrors";
import * as types from "./types";
import { clearErrMsg, setErrMsg, setLoading } from "./_MainAction";
import { store } from "../store";
export const setNotifBar = (bars) => ({
  type: types.SET_NOTIFICATION_BAR,
  payload: bars,
});

export const setNotification = (notification) => ({
  type: types.SET_NOTIFICATION,
  payload: notification,
});

export const setNotifLoading = (loading = false) => ({
  type: types.SET_NOTIF_LOADING,
  payload: loading,
});

export const setNotifPage = (page) => ({
  type: types.SET_NOTIF_PAGE,
  payload: page,
});

export const setError = (id, error) => {
  const {
    notification: { all, likes, comments, follows },
    notification,
  } = store.getState().notification;
  const concat = [...all, ...likes, ...comments, ...follows];
  const index = concat.findIndex((item) => item.id === id);
  const field = concat[index];
  field.error = error;
  const i = notification[field.type].findIndex((item) => item.id === id);
  notification[field.type][i] = field;
  // const tp = notification[field.type].map((item) => {
  //   if (item.id === id) item = field;
  //   return item;
  // });
  // console.log(tp);
  store.dispatch(setNotification(notification));
};

export const getNotification = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  const { page, notification } = getState().notification;
  if (page === 0) {
    dispatch(setNotifLoading(true));
  } else dispatch(setLoading("notifLoading", true));

  const setObj = (array, key, value) => {
    const result = array.map((item) => {
      item[key] = value;
      return item;
    });
    return result;
  };
  const p = page + 1;
  try {
    const data = await notificationService.getNotifications(p);
    handleApiErrors(data)
      .then(
        ({
          result: { all_count, likes_count, comments_count, follows_count },
          result,
        }) => {
          dispatch(
            setNotifBar({
              all_count,
              likes_count,
              comments_count,
              follows_count,
            })
          );
          result.all = setObj(result.all, "id", ~~(Math.random() * 999999));
          result.likes = setObj(result.likes, "id", ~~(Math.random() * 999999));
          result.comments = setObj(
            result.comments,
            "id",
            ~~(Math.random() * 999999)
          );
          result.follows = setObj(
            result.follows,
            "id",
            ~~(Math.random() * 999999)
          );
          result.all = setObj(result.all, "error", true);
          result.likes = setObj(result.likes, "error", true);
          result.comments = setObj(result.comments, "error", true);
          result.follows = setObj(result.follows, "error", true);
          result.all = setObj(result.all, "type", "all");
          result.likes = setObj(result.likes, "type", "likes");
          result.comments = setObj(result.comments, "type", "comments");
          result.follows = setObj(result.follows, "type", "follows");
          if (p > 1) {
            const notifs = { ...notification };
            let { all, likes, comments, follows } = result;
            notifs.all.push(...all);
            notifs.likes.push(...likes);
            notifs.comments.push(...comments);
            notifs.follows.push(...follows);

            dispatch(setNotification(notifs));
            setNotifBar({
              all_count,
              likes_count,
              comments_count,
              follows_count,
            });
            dispatch(setLoading("", false));
          } else {
            dispatch(setNotification(result));
          }
          dispatch(setNotifPage(p));
          dispatch(setNotifLoading());
        }
      )
      .catch((e) => {
        dispatch(setNotifLoading());
      });
  } catch (e) {
    dispatch(setNotifLoading());
    dispatch(setErrMsg(e));
  }
};
