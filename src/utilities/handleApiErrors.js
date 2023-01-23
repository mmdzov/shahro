import { setAlert } from "store/actions/_MainAction";
import { store } from "../store/store";

const handleApiErrors = (data) => {
  const { status, alert, fastLogout } = data;
  if (fastLogout && fastLogout === 1) {
    localStorage.removeItem("authID");
    localStorage.removeItem("sessionID");
    window.location.replace("/login");
  }
  if (status !== 1) {
    if (alert?.has === 1) {
      return Promise.reject({ ...alert, type: "alert" });
    }
    const error = {
      code: 404,
      message: "مشکلی در سرور وجود دارد لطفا بعدا امتحان کنید!",
      type: "status",
    };
    store.dispatch(
      setAlert({
        msg: error.message,
        code: error.code,
        show: true,
      })
    );
    return Promise.reject(error);
  }
  // setTimeout(() => {
  //   store.dispatch(setProgressMode("done"));
  // }, 1000);
  return Promise.resolve(data);
};

export default handleApiErrors;
