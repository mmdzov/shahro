import AuthAlert from "components/Utilities/AuthAlert";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginWrapper = ({ children }) => {
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const history = useHistory();
  const [click, setClick] = useState(false);
  useEffect(() => {
    if (notifAlert.mode === "signin" || notifAlert.mode === "verify") {
      if (notifAlert.mode === "signin") {
        history.push("/verification");
      }
      setTimeout(() => {
        setClick(true);
        // dispatch(clearAlert());
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifAlert]);
  return (
    <Fragment>
      {children}
      {notifAlert?.mode === "signin" ? (
        <AuthAlert
          alert={{
            message: notifAlert?.msg ?? " ",
            title: notifAlert?.title ?? " ",
          }}
          clicked={click}
          setClicked={setClick}
        />
      ) : null}
    </Fragment>
  );
};

export default LoginWrapper;
