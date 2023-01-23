/* eslint-disable no-unused-vars */
import accountService from "api/accountService";
import handleApiErrors from "utilities/handleApiErrors";
import * as t from "./types";
import {
  clearAlert,
  clearErrMsg,
  setAlert,
  setErrMsg,
  setHasEndPages,
  setLoading,
} from "./_MainAction";

export const setloadingAcc = (loading = false) => ({
  type: t.SET_LOADING_ACCOUNT,
  payload: loading,
});

export const setAccount = (account) => ({
  type: t.SET_ACCOUNT,
  payload: account,
});

export const clearAccount = () => ({
  type: t.GET_ACCOUNT,
  payload: {},
});

export const clearProfileImage = () => ({
  type: t.ADD_PROFILE_IMAGE,
  payload: "",
});

export const getHomeAccounts = (data = []) => ({
  type: t.GET_HOME_ACCOUNTS,
  payload: data,
});

export const getAccount = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await accountService.getUserAccount();
    await handleApiErrors(data)
      .then(({ result: { account } }) => {
        dispatch({ type: t.GET_ACCOUNT, payload: account });
        dispatch({ type: t.ADD_PROFILE_IMAGE, payload: account?.image || "" });
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const updateAccount = (param) => async (dispatch, getState) => {
  const { profile } = getState().account;
  dispatch(clearErrMsg());
  try {
    dispatch(clearAlert());
    const data = await accountService.updateAccount(param);
    handleApiErrors(data)
      .then(
        ({
          result: { account },
          alert: { title, message: msg, has },
          alert,
        }) => {
          dispatch(
            setAlert({ mode: "updateAccount", show: true, title, msg, has })
          );
          const prof = { ...profile };
          if (prof?.account) {
            prof.account = account;
          }
          dispatch({ type: t.UPDATE_ACCOUNT, payload: account });
          dispatch({ type: t.SET_PROFILE, payload: prof });
          // dispatch(fastAlert(alert));
        }
      )
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const addProfileImage = (param) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    dispatch(clearAlert());
    const data = await accountService.addImage(param);
    handleApiErrors(data)
      .then(({ result: { image }, alert: { title, message: msg, has } }) => {
        dispatch(setAlert({ mode: "addImage", show: true, title, msg, has }));
        dispatch({ type: t.ADD_PROFILE_IMAGE, payload: image });
      })
      .catch((e) => {
        dispatch(
          setAlert({
            mode: "addImage",
            show: true,
            title: e?.title,
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
export const clearSessions = () => ({
  type: t.GET_ACTIVE_SESSIONS,
  payload: {},
});
export const getActiveSessions = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    dispatch(clearAlert());
    const data = await accountService.activeSessions();
    handleApiErrors(data)
      .then(({ result }) => {
        dispatch({ type: t.GET_ACTIVE_SESSIONS, payload: result });
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const sessionKill = (token) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  dispatch(clearAlert());
  try {
    dispatch(clearAlert());
    const data = await accountService.sessionKill({ session: token });
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        const {
          account: { sessions },
        } = getState();
        dispatch(
          setAlert({ mode: "sessionKill", show: true, title, msg, has })
        );
        const filter = sessions.sessions.filter((item) => item.token !== token);
        sessions.sessions = filter;
        dispatch({ type: t.SESSION_KILL, payload: sessions });
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const sessionKillAll = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  dispatch(clearAlert());
  try {
    dispatch(clearAlert());
    const data = await accountService.sessionKill({ session: "all" });
    handleApiErrors(data)
      .then(({ alert: { title, message: msg, has } }) => {
        const {
          account: { sessions },
        } = getState();
        dispatch(
          setAlert({ mode: "sessionKillAll", show: true, title, msg, has })
        );
        sessions.sessions = [];
        sessions.currentSession = {};
        dispatch({ type: t.SESSION_KILL_ALL, payload: sessions });
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const sessionKillAllOther = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  dispatch(clearAlert());
  try {
    dispatch(clearAlert());
    const data = await accountService.sessionKill({ session: "allOthers" });
    handleApiErrors(data)
      .then(({ alert: { title, message: msg, has } }) => {
        const {
          account: { sessions },
        } = getState();
        dispatch(
          setAlert({ mode: "sessionKillAllOther", show: true, title, msg, has })
        );
        sessions.sessions = [];
        dispatch({ type: t.SESSION_KILL_ALLOTHER, payload: sessions });
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setProfile = (profile = {}) => ({
  type: t.SET_PROFILE,
  payload: profile,
});

export const setEndPage = (end = false) => ({
  type: t.HAS_END_PAGE,
  payload: end,
});

export const setProfilePage = (profile = 0) => ({
  type: t.SET_PROFILE_PAGE,
  payload: profile,
});

export const setLastProfilePosition = (position) => ({
  type: t.GET_LAST_PROFILE_POSITION,
  payload: position,
});

export const setProfileTab = (TAB = "main") => ({
  type: t.SET_PROFILE_TAB,
  payload: TAB,
});

export const getProfile = (id) => async (dispatch, getState) => {
  const { profilePage, profile, hasEndPage } = getState().account;
  if (hasEndPage) return;
  dispatch(clearErrMsg());
  let currentPage = profilePage;
  if (profilePage > 0) currentPage += 1;
  if (profilePage === 0) currentPage = 1;
  try {
    const getId = localStorage.getItem("authID");
    let unique = {};
    if (getId !== id) unique = { account: id, profilePage: currentPage };
    if (getId === id) unique = { profilePage: currentPage };
    const data = await accountService.getProfile(unique);
    handleApiErrors(data)
      .then(({ result }) => {
        if (result.all.length === 0 && result.links.length === 0)
          dispatch(setEndPage(true));
        const { posts, links, all, products } = result;
        if (currentPage === 1) {
          dispatch(setProfile(result));
          dispatch(setLoading("profileLoading", true));
        } else {
          const {
            posts: profPosts,
            links: profLinks,
            all: profAll,
            products: profProducts,
          } = profile;
          profPosts.push(...posts);
          profLinks.push(...links);
          profAll.push(...all);
          profProducts.push(...products);
          dispatch(
            setProfile({
              ...profile,
              posts: profPosts,
              links: profLinks,
              all: profAll,
              products: profProducts,
            })
          );
        }
        dispatch(setProfilePage(currentPage));
      })
      .catch((e) => {
        // dispatch(
        //   setAlert({
        //     mode: "profileNotFound",
        //     msg: e.message,
        //     title: e.title,
        //     show: true,
        //   })
        // );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setAccountPage = (page) => ({
  type: t.SET_FOLLOW_PAGE,
  payload: page,
});

export const setFollows = (followers) => ({
  type: t.SET_FOLLOWERS,
  payload: followers,
});

export const setFollowAccount = (account = {}) => ({
  type: t.FOLLOW_ACCOUNT,
  payload: account,
});

export const setFollowers = (id) => async (dispatch, getState) => {
  const {
    account: { page, followers },
  } = getState();
  dispatch(clearErrMsg());
  let setPage = page + 1;
  if (setPage === 1) dispatch(setloadingAcc(true));
  else dispatch(setLoading("followLoading", true));
  try {
    const getId = localStorage.getItem("authID");
    let params = { followerPage: setPage };
    if (getId !== id) params.account = id;
    const data = await accountService.getFollowers(params);
    handleApiErrors(data)
      .then(({ result }) => {
        dispatch(setAccountPage(setPage));
        if (setPage === 1) {
          dispatch(setFollows(result.followers));
          dispatch(setFollowAccount(result.account));
          dispatch(setloadingAcc());
        } else {
          const f = [...followers];
          f.push(...result.followers);
          dispatch(setFollows(f));
          dispatch(setLoading("", false));
        }
      })
      .catch((e) => {
        if (setPage === 1) dispatch(setloadingAcc());
        else dispatch(setLoading("", false));
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setFollowing = (followings) => ({
  type: t.SET_FOLLOWINGS,
  payload: followings,
});

export const setFollowings = (id) => async (dispatch, getState) => {
  const {
    account: { page, followings },
  } = getState();
  dispatch(clearErrMsg());
  let setPage = page + 1;
  if (setPage === 1) dispatch(setloadingAcc(true));
  else dispatch(setLoading("followLoading", true));
  try {
    const getId = localStorage.getItem("authID");
    let params = { followingPage: setPage };
    if (getId !== id) params.account = id;
    const data = await accountService.getFollowings(params);
    handleApiErrors(data)
      .then(({ result }) => {
        dispatch(setAccountPage(setPage));
        if (setPage === 1) {
          dispatch(setFollowing(result.followings));
          dispatch(setFollowAccount(result.account));
          dispatch(setloadingAcc());
        } else {
          const f = [...followings];
          f.push(...result.followings);
          dispatch(setFollowing(f));
          dispatch(setLoading("", false));
        }
      })
      .catch((e) => {
        if (setPage === 1) dispatch(setloadingAcc());
        else dispatch(setLoading("", false));
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setLocation = (location) => ({
  type: t.ADD_LOCATION,
  payload: location,
});

export const setLocations = (locations) => ({
  type: t.ADD_LOCATIONS,
  payload: locations,
});

export const setDefaultLocation =
  (token, isFirst = false) =>
  async (dispatch, getState) => {
    dispatch(clearErrMsg());
    // const { locations } = getState().account;
    // const index = locations.findIndex((item) => item.token === token);
    // if (!isFirst && locations[index].isDefault === 1) return;
    try {
      const data = await accountService.setAddress(token);
      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has } }) => {
          if (!isFirst) {
            dispatch(
              setAlert({
                mode: "changeLocation",
                show: true,
                title,
                msg,
                has,
              })
            );
          } else if (isFirst === "edit") {
            const index = result.locations.findIndex(
              (item) => item.token === token
            );
            const allFalseDefault = result?.locations?.map((item) => {
              item.isDefault = 0;
              return item;
            });
            const splc = allFalseDefault.splice(index, 1);
            splc[0].isDefault = 1;
            allFalseDefault.unshift(...splc);
            dispatch(setLocations(allFalseDefault));
          }
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const addLocation =
  (params, setLocs, locs) => async (dispatch, getState) => {
    dispatch(clearErrMsg());
    try {
      const data = await accountService.addLocation(params);
      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has } }) => {
          const last = result?.locations?.slice(-1);
          const allFalseDefault = result?.locations?.map((item) => {
            item.isDefault = 0;
            return item;
          });
          last[0].isDefault = 1;
          allFalseDefault.unshift(...last);
          setLocs(allFalseDefault);
          dispatch(setLocation(result?.location));
          dispatch(setLocations(result?.locations.reverse()));
          dispatch(setDefaultLocation(last[0].token, true));
          dispatch(
            setAlert({
              mode: "successAddLocation",
              show: true,
              title,
              msg,
              has,
            })
          );
        })
        .catch((e) => {
          dispatch(
            setAlert({
              mode: "addLocation",
              show: true,
              title: e.title,
              msg: e.message,
              has: e.has,
            })
          );
          dispatch(clearErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

const setMoreLocation = (params) => ({
  type: t.SET_MORE_LOCATION,
  payload: params,
});

export const getLocation = () => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  try {
    const data = await accountService.getLocation();
    handleApiErrors(data)
      .then(({ result: { onlyPayOnline }, result }) => {
        const def = result?.locations?.filter((item) => item.isDefault === 1);
        dispatch(setLocation(...def));
        const reversed = result?.locations?.reverse();
        const index = reversed.findIndex((item) => item.isDefault === 1);
        const splc = reversed.splice(index);
        reversed.unshift(...splc);
        dispatch(setLocations(reversed));
        dispatch(setMoreLocation({ onlyPayOnline }));
      })
      .catch((e) => {
        dispatch(
          setAlert({
            mode: "getLocation",
            show: true,
            title: e.title,
            msg: e.message,
            has: e.has,
          })
        );
        dispatch(clearErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const deleteLocation = (token) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  const { locations } = getState().account;
  try {
    const data = await accountService.deleteAddress(token);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        const filteredLocations = locations.filter(
          (item) => item.token !== token
        );
        dispatch(setLocations(filteredLocations));
        dispatch(
          setAlert({
            mode: "deleteLocation",
            show: true,
            title,
            msg,
            has,
          })
        );
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const changeLocation =
  (token, address, postalCode) => async (dispatch, getState) => {
    dispatch(clearErrMsg());
    const { locations } = getState().account;
    try {
      const index = locations.findIndex((item) => item.token === token);
      const item = locations[index];
      const params = {
        location: item.token,
        address,
        postalCode,
        lat: 0,
        lng: 0,
      };
      const data = await accountService.editAddress(params);
      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has } }) => {
          locations[index].address = address;
          locations[index].postalCode = postalCode;
          dispatch(setLocations(locations));
          dispatch(
            setAlert({
              mode: "editLocation",
              show: true,
              title,
              msg,
              has,
            })
          );
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setFavorite = (favorite = {}) => ({
  type: t.SET_FAVORITE,
  payload: favorite,
});

export const setHasEndFavoritePage = (has = false) => ({
  type: t.HAS_END_FAVORITE_PAGE,
  payload: has,
});

export const getFavorite = () => async (dispatch, getState) => {
  const {
    account: { page, favorite, hasEndFavoritePage },
  } = getState();
  dispatch(clearErrMsg());
  // if (hasEndFavoritePage) return;
  let setPage = page + 1;
  if (setPage === 1) dispatch(setloadingAcc(true));
  else dispatch(setLoading("favoriteLoading", true));
  try {
    let params = { favoritePage: setPage };
    const data = await accountService.favorite(params);
    handleApiErrors(data)
      .then(({ result }) => {
        if (
          result.ads.length === 0 &&
          result.posts.length === 0 &&
          result.products.length === 0
        ) {
          dispatch(setHasEndFavoritePage(true));
        }
        dispatch(setAccountPage(setPage));
        if (setPage === 1) {
          dispatch(setFavorite(result));
          dispatch(setloadingAcc());
        } else {
          const {
            posts: favPosts,
            products: favProducts,
            ads: favAds,
          } = favorite;
          favPosts.push(...(result?.posts || []));
          favProducts.push(...(result?.products || []));
          favAds.push(...(result?.ads || []));
          dispatch(
            setFavorite({
              ...favorite,
              posts: favPosts,
              products: favProducts,
              ads: favAds,
            })
          );
          dispatch(setLoading("", false));
        }
      })
      .catch((e) => {
        if (setPage === 1) dispatch(setloadingAcc());
        else dispatch(setLoading("", false));
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setWallet = (wallet = []) => ({
  type: t.SET_WALLET,
  payload: wallet,
});

export const setMoreWallet = (moreWallet = {}) => ({
  type: t.SET_MORE_WALLET,
  payload: moreWallet,
});

export const getWallet = () => async (dispatch, getState) => {
  const {
    account: { page, wallet },
    _MainReducer: { hasEndPages },
  } = getState();
  if (hasEndPages) return;
  dispatch(clearErrMsg());
  let setPage = page + 1;
  if (setPage === 1) dispatch(setloadingAcc(true));
  else dispatch(setLoading("walletLoading", true));
  try {
    let params = { paymentPage: setPage };
    const data = await accountService.getWallet(params);
    handleApiErrors(data)
      .then(({ result }) => {
        if (result.payments.length === 0) {
          dispatch(setHasEndPages(true));
          dispatch(setLoading("", false));
          return;
        }
        dispatch(setAccountPage(setPage));
        if (setPage === 1) {
          dispatch(setWallet(result?.payments));
          dispatch(setloadingAcc());
        } else {
          const payment = [...wallet];
          payment.push(...result?.payments);
          dispatch(setWallet(payment));
          dispatch(setLoading("", false));
        }
        delete result?.payments;
        dispatch(setMoreWallet(result));
      })
      .catch((e) => {
        if (setPage === 1) dispatch(setloadingAcc());
        else dispatch(setLoading("", false));
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};
