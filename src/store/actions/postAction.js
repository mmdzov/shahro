import * as types from "./types";
import axios from "axios";
import { clearErrMsg, setAlert, setErrMsg } from "./_MainAction";
import postService from "api/postService";
import handleApiErrors from "utilities/handleApiErrors";
import { allowToCreateMedia } from "./mediaActions";

export const setLastPostPosition = (position) => ({
  type: types.GET_LAST_POST_POSITION,
  payload: position,
});

export const setSinglePost = (post = null) => ({
  type: types.GET_SINGLE_POST,
  payload: post,
});

export const getPost = (token, history) => async (dispatch) => {
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      const res = await axios.post(
        "https://api.mireseh.ir/v1/post-single",
        {
          post: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.status === 0) {
        history.replace("/media");
      }
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
      }
      const d = { ...res.data.result };
      d?.slides?.map((item) => {
        item.error = false;
        item.id = "b" + ~~(Math.random() * 999999);
        return item;
      });
      if (res.data.status === 1) {
        dispatch(setSinglePost(d));
      }
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};
export const getEditPost = (token, history) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await postService.getEditPost({
      post: token,
    });
    handleApiErrors(data)
      .then(({ result, alert }) => {
        if (alert.has === 1) {
          dispatch({
            type: types.SET_ALERT,
            payload: alert,
          });
          dispatch(
            setAlert({
              mode: "getEditPost",
              show: true,
              title: alert.title,
              msg: alert.message,
              has: alert.has,
            })
          );
        }
        const d = { ...result };
        d?.slides?.map((item) => {
          item.error = false;
          item.id = "b" + ~~(Math.random() * 999999);
          return item;
        });
        dispatch(setSinglePost(d));
      })
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

export const setComments = (comments = null) => ({
  type: types.GET_COMMENTS,
  payload: comments,
});

export const getComments = (token) => async (dispatch, getState) => {
  const { post } = getState().post;
  if (post?.showComments && post?.showComments === 0) return;
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      const res = await axios.post(
        "https://api.mireseh.ir/v1/post-comment",
        {
          post: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
      }
      if (res.data.status === 1) {
        dispatch({
          type: types.GET_COMMENTS,
          payload: res.data.result.comments,
        });
      } else {
      }
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};
export const sendComment = (message, token) => async (dispatch, getState) => {
  const { comments } = getState().post;
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      const res = await axios.post(
        "https://api.mireseh.ir/v1/post-comment-submit",
        {
          message: message,
          post: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
        const { title, message: msg, has } = res.data.alert;
        dispatch(
          setAlert({ mode: "addPostComment", show: true, title, msg, has })
        );
      }
      if (res.data.status === 1) {
        dispatch({
          type: types.SEND_COMMENTS,
        });
        const cms = [...comments];
        cms.unshift(res.data.result.comment);
        dispatch({
          type: types.GET_COMMENTS,
          payload: cms,
        });
      }
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};
export const sendCommentReport =
  (title, message, token) => async (dispatch) => {
    try {
      const session = await localStorage.getItem("sessionID");
      const auth = await localStorage.getItem("authID");
      if (session && auth) {
        const res = await axios.post(
          "https://api.mireseh.ir/v1/post-comment-report",
          {
            type: title,
            description: message,
            comment: token,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authID: auth,
              sessionID: session,
            },
          }
        );
        const { alert } = res.data;
        if (alert && alert.has === 1) {
          dispatch(
            setAlert({
              mode: "addReportComment",
              show: true,
              title: alert.title,
              msg: alert.message,
              has: alert.has,
            })
          );
          dispatch({
            type: types.SET_ALERT,
            payload: res.data.alert,
          });
        }
        if (res.data.status === 1) {
          dispatch({
            type: types.SEND_COMMENTS_REPORT,
          });
        }
      }
    } catch (err) {
      dispatch({
        type: types.GET_ERROR,
        payload: err,
      });
    }
  };
export const likeComment = (value, token) => async (dispatch) => {
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      const res = await axios.post(
        "https://api.mireseh.ir/v1/post-comment-like",
        {
          value: value,
          comment: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
        dispatch(
          setAlert({
            mode: "likePostComment",
            show: true,
            has: 1,
            title: res.data.alert.title,
            msg: res.data.alert.message,
          })
        );
      }
      if (res.data.status === 1) {
        dispatch({
          type: types.LIKE_COMMENT,
        });
      }
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};
export const likePost = (value, token) => async (dispatch) => {
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      const res = await axios.post(
        "https://api.mireseh.ir/v1/post-like",
        {
          value: value,
          post: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
        dispatch(
          setAlert({
            mode: "likePost",
            show: true,
            has: 1,
            title: res.data.alert.title,
            msg: res.data.alert.message,
          })
        );
      }
      if (res.data.status === 1) {
        dispatch({
          type: types.LIKE_POST,
        });
      }
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};

export const setLoadingPost = () => {
  return {
    type: types.SET_LOADING_POST,
  };
};

export const setMyPosts = (posts = []) => ({
  type: types.SET_MY_POSTS,
  payload: posts,
});

export const getMyPosts = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await postService.getMyPostList();
    handleApiErrors(data)
      .then(({ result: { orders, allowToCreate }, alert }) => {
        if (orders && orders.length > 0) {
          dispatch(setMyPosts(orders));
        }
        dispatch(allowToCreateMedia(allowToCreate));
        if (alert.has === 1) {
          dispatch(
            setAlert({
              mode: "myPosts",
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
            mode: "myPostsError",
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
