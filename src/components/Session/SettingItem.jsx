import ModalConnection from "components/Utilities/Modal/ModalConnection";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sessionKill } from "store/actions/accountAction";
import toPersian from "utilities/ToPersian";
import {
  SettingItemContainer,
  RemoveSingleSession,
  Online,
  SettingItemRow,
} from "./Session.styled";

const SettingItem = ({
  token,
  userAgent,
  isGuest,
  datetime,
  ip,
  location,
  app,
  current = false,
  hasCurrent = false,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (token) => {
    await setLoading(true);
    await dispatch(sessionKill(token));
    await setLoading(false);
  };

  return (
    <SettingItemContainer
      style={{ background: current ? "white" : "transparent" }}
    >
      {loading ? <ModalConnection /> : null}
      <SettingItemRow>
        <div>{toPersian(userAgent)}</div>
        {hasCurrent ? <Online>آنلاین</Online> : null}
      </SettingItemRow>
      <SettingItemRow
        style={{
          color: "rgb(72 72 72)",
          fontSize: ".8rem",
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        <div>{toPersian(ip)}</div>
        <div>{toPersian(datetime)}</div>
      </SettingItemRow>
      <SettingItemRow
        style={{ fontSize: ".8rem", color: "rgb(72 72 72)", fontWeight: 600 }}
      >
        <div>{toPersian(app)}</div>
        {hasCurrent ? null : (
          <RemoveSingleSession onClick={() => handleDelete(token)}>
            حذف
          </RemoveSingleSession>
        )}
      </SettingItemRow>
    </SettingItemContainer>
  );
};

export default SettingItem;
