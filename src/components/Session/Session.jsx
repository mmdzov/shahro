import AuthAlert from "components/Utilities/AuthAlert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  sessionKillAll,
  sessionKillAllOther,
} from "store/actions/accountAction";
import { clearAlert } from "store/actions/_MainAction";
import { Container, Muted, RemoveSession } from "./Session.styled";
import SettingList from "./SettingList";

const Session = () => {
  const {
    sessions: { currentSession, sessions },
  } = useSelector(({ account }) => account);
  const history = useHistory();
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  const dispatch = useDispatch();
  const Ok = () => {
    dispatch(clearAlert());
    if (notifAlert.mode === "sessionKillAll") {
      localStorage.removeItem("authID");
      localStorage.removeItem("sessionID");
      history.replace("/login");
    }
  };
  const handleDeleteAll = () => {
    dispatch(sessionKillAll());
  };
  const handleDeleteAllOther = () => {
    dispatch(sessionKillAllOther());
  };
  return (
    <Container>
      {notifAlert.mode === "sessionKill" ||
      notifAlert.mode === "sessionKillAll" ||
      notifAlert.mode === "sessionKillAllOther" ? (
        <AuthAlert
          alert={{ title: notifAlert.title, message: notifAlert.msg }}
          go={Ok}
        />
      ) : null}
      <SettingList
        title="نشست جاری"
        current={true}
        items={currentSession ? [currentSession] : null}
      />
      <RemoveSession onClick={handleDeleteAll}>
        از بین بردن نشست های فعال
      </RemoveSession>
      <Muted onClick={handleDeleteAllOther}>
        از بین بردن تمام نشست های فعال به غیر از نشست جاری
      </Muted>
      <SettingList
        title="نشست های فعال دیگر"
        items={sessions ? sessions : null}
      />
      <Muted>
        در لیست فوق دیگر نشست ها و دستگاهایی که با شناسه کاربری شما وارد شده است
        وجود دارد می توانید با لمس هر یک آنها را از حساب کاربری خود خارج کنید
      </Muted>
    </Container>
  );
};

export default Session;
