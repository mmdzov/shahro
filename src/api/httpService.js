import axios from "axios";
import url, { shv1 } from "./endpoint.json";

const http = axios.create({
  baseURL: url.shv1,
  headers: {
    authID: localStorage.getItem("authID"),
    sessionID: localStorage.getItem("sessionID"),
  },
});

//defaults
http.defaults.headers.post["Content-Type"] = "application/json";
http.defaults.headers.post["sessionID"] = localStorage.getItem("sessionID");
http.defaults.headers.post["authID"] = localStorage.getItem("authID");

http.interceptors.response.use(null, (err) => {
  const errorException =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!errorException) {
    console.log(err);
  }
  return Promise.reject(err);
});

axios.interceptors.response.use(
  (config) => {
    // store.dispatch(setProgressMode("pending"));
    return config;
  },
  (err) => {
    const errorException =
      err.response && err.response.status >= 400 && err.response.status < 500;

    if (!errorException) {
      console.log(err);
    }
    // store.dispatch(setProgressMode("done"));
    return Promise.reject(err);
  }
);

axios.interceptors.request.use(
  (config) => {
    // store.dispatch(setProgressMode("start"));
    return config;
  },
  (err) => {
    // store.dispatch(setProgressMode("done"));
    return Promise.reject(err);
  }
);
const post = async (url, parameters = {}, headers) => {
  // await store.dispatch(setProgressMode("start"));
  const auth = await localStorage.getItem("authID");
  const session = await localStorage.getItem("sessionID");
  const { data } = await axios.post(`${shv1}${url}`, parameters, {
    headers: {
      authID: await auth,
      sessionID: await session,
      ...headers,
    },
  });
  // store.dispatch(setProgressMode("pending"));
  return data;
};
// const post = async (url, parameters = {}, headers) => {
//   const auth = await localStorage.getItem("authID");
//   const session = await localStorage.getItem("sessionID");
//   const { data } = await http.post(`${url}`, parameters, {
//     headers: {
//       ...headers,
//     },
//   });
//   return data;
// };

export { http, url, post };
