/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { setPath, changePath } from "store/actions/pathAction";
import { setLoading } from "store/actions/_MainAction";

const usePath = () => {
  const history = useHistory();
  const location = useLocation();
  const [root] = useState("/");
  const { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const { prevPaths: paths } = useSelector(({ path }) => path);

  const manage = (mode = "", params, deleteBy) => {
    let pth = [...paths];
    switch (mode) {
      case "pop": {
        pth.pop();
        dispatch(changePath(pth));
        break;
      }
      case "add": {
        pth.push(params);
        dispatch(changePath(pth));
        break;
      }
      case "delete": {
        const filtered = pth.filter((item) => item?.[deleteBy] !== params);
        dispatch(changePath(filtered));
        break;
      }
      case "clear": {
        dispatch(changePath());
        break;
      }
      default:
        return;
    }
  };

  const goBackOfHistory = () => {
    const hasPathChanged = window.sessionStorage.getItem("pathChanged");
    if (hasPathChanged) {
      history.goBack();

    } else history.replace("/");
  };

  const goBack = (to = "", params = {}) => {
    // dispatch(setLoading("mainLoading", true));
    const hasExist = paths?.length > 0;
    const index = paths?.findIndex((item) => item?.pathname === root);
    console.log(to, hasExist, paths, index, pathname);
    if (paths.slice(-1)[0].pathname === pathname && paths?.length > 1) {
      return goBackOfHistory();
    }
    if (!hasExist) history.replace(root, state);
    else if (index !== -1 && pathname === paths[paths.length - 1]?.pathname) {
      const newPaths = paths.filter((item) => item.pathname !== pathname);
      dispatch(changePath(newPaths));
      if (to) {
        goReplace(to, { ...state, ...params });
      } else {
        goBackOfHistory();
      }
    } else {
      if (!to && paths.length > 1) {
        goBackOfHistory();
        manage("delete", pathname, "pathname");
      } else {
        history.replace(root, state);
        manage("delete", pathname, "pathname");
      }
    }
  };

  const goForward = (to = root, params = {}) => {
    if (params === false) {
      history.push(to);
      dispatch(setPath(location));
    } else if (params && Object.keys(params)?.length === 0) {
      history.push({
        pathname: to,
        state: { ...state },
      });
    } else if (Object.keys(params)?.length > 0) {
      history.push({
        pathname: to,
        state: { ...params },
      });
    }
    dispatch(setPath({ ...location }));
  };

  let findSimilarState = (to, state, customParam = "") => {
    let trim = to.split(root);
    trim = trim.filter((item) => item);
    let items = [];
    let parse = state ? Object.values(state) : [];
    parse = parse.filter((item) => item);
    for (let i of parse) {
      i = i.toString();
      if (customParam) {
        if (
          customParam === i ||
          i?.includes(customParam) ||
          customParam?.includes(i || "")
        ) {
          items.push(customParam);
        }
      } else {
        const item = trim.map((item) => {
          if (item === i || i?.includes(item) || item?.includes(i)) {
            return item;
          }
          return "";
        });
        items.push(...item);
      }
    }
    items = items.filter((item) => item);
    return items;
  };

  const checkCurrentHasBefore = (before, current) => {
    if (before === current) return true;
  };

  const goAdvanceBack = (to = root, customParam = "", params = {}) => {
    const beforeCurrent = paths.slice(-2);
    const hasSpecial =
      state &&
      Object.keys(state)?.length > 0 &&
      customParam &&
      customParam?.length > 0
        ? true
        : false;
    const path = beforeCurrent[0]?.pathname;
    const stateParams = beforeCurrent[0]?.state;
    const param = Object.keys(params)?.length > 0 ? params : state;
    const hasBeforeExist = checkCurrentHasBefore(path, pathname);
    const similar = findSimilarState(to, stateParams, customParam);
    // console.log(path, similar, stateParams, beforeCurrent, to, customParam);

    if ((path === to && to !== root) || hasSpecial) {
      goBackOfHistory();
    } else if (
      state?.from === to ||
      (customParam?.length > 0 && customParam === state?.from) ||
      similar?.length > 0
    ) {
      history.replace(to, param);
    } else {
      // console.log(beforeCurrent, path, stateParams, to, hasSpecial);
      if (beforeCurrent?.length === 1) {
        history.replace(to !== path ? to : root, param);
      } else if (beforeCurrent?.length > 1) {
        if (to !== path) {
          if (hasSpecial) {
            if (hasBeforeExist) goBackOfHistory();
            else history.replace(to, param);
          } else {
            if (hasBeforeExist) goBackOfHistory();
            else history.replace(root, param);
          }
        } else {
          history.replace(root, param);
        }
      }
    }
  };

  const go = (to) => {
    const last = getLastRoute(-2);
    if (last?.route === to) {
      goBackOfHistory();
      const pth = [...paths];
      pth.pop();
      dispatch(changePath(pth));
    } else history.replace(to ? to : root, state);
  };

  const getLastRoute = (countFromEnd = -1) => {
    const last = paths.slice(countFromEnd)[0];
    return { state: last?.state, route: last?.pathname };
  };

  const changeState = async (key = "", value = "", callback = () => {}) => {
    const lastRoute = getLastRoute();
    if (lastRoute.state && lastRoute.state?.[key]) {
      let pts = [...paths];
      pts[paths.length - 1].state[key] = value;
      await dispatch(setPath(pts));
      await callback(pts, lastRoute);
    }
  };

  const goReplace = (to = root, params = {}) => {
    const lastRoute = getLastRoute(-2).route;
    const pts = [...paths];
    if (params === true) {
      const filtered = pts.filter(
        (item) => item.pathname !== location.pathname
      );
      dispatch(changePath(filtered));
      // console.log(lastRoute, to);
      if (to === lastRoute) {
        goBack();
      } else {
        history.replace({
          pathname: to,
          state,
        });
      }
    }
    if (params === false) {
      history.replace(to);
    } else if (params && Object.keys(params)?.length === 0) {
      history.replace({
        pathname: to,
        state,
      });
    } else if (Object.keys(params)?.length > 0) {
      history.replace({
        pathname: to,
        state: params,
      });
    }
  };
  const removePath = (param, callback = () => {}) => {
    let result = [];
    if (param?.length > 0) {
      for (let i of paths) {
        let special = false;
        let state = i?.state;
        // console.log(state);
        if (state instanceof Object) {
          const values = Object.values(state);
          const findSimilarParam = values.some((item) => item === param);
          if (findSimilarParam) {
            special = true;
            // break;
          }
        }
        if (!special) result.push(i);
      }
    }
    dispatch(changePath(result));
    callback(result.slice(-1)[0]);
  };
  return {
    removePath,
    goBack,
    goForward,
    goReplace,
    go,
    goAdvanceBack,
    getLastRoute,
    changeState,
    goBackOfHistory,
  };
};

export default usePath;
