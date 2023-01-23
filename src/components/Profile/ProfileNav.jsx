import { ProfileNav as ProfileNavContainer } from "./Profile.styled";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AppsIcon from "@material-ui/icons/Apps";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import InboxIcon from "@material-ui/icons/Inbox";
import { useDispatch, useSelector } from "react-redux";
import {
  setLastProfilePosition,
  setProfileTab,
} from "store/actions/accountAction";
import { memo } from "react";
import { ButtonBase } from "@material-ui/core";
import styled from "styled-components";

const ProfileNav = () => {
  const { profileTab: tab } = useSelector(({ account }) => account);
  const { profile, lastProfilePosition } = useSelector(
    ({ account }) => account
  );
  const dispatch = useDispatch();
  const handleChangeTab = (tab) => {
    dispatch(setProfileTab(tab));
    if (lastProfilePosition === 0) return;
    else dispatch(setLastProfilePosition(0));
  };
  return (
    <ProfileNavContainer>
      <BtnBase onClick={() => handleChangeTab("main")} radius="0" color="gray">
        <div style={{ color: tab === "main" ? "#080808" : "#bbbbbb" }}>
          <AppsIcon />
        </div>
      </BtnBase>
      {profile?.products?.length > 0 ? (
        <BtnBase
          onClick={() => handleChangeTab("products")}
          radius="0"
          color="gray"
        >
          <div style={{ color: tab === "products" ? "#080808" : "#bbbbbb" }}>
            <LocalMallIcon />
          </div>
        </BtnBase>
      ) : null}
      {profile?.posts?.length > 0 ? (
        <BtnBase
          onClick={() => handleChangeTab("posts")}
          radius="0"
          color="gray"
        >
          <div style={{ color: tab === "posts" ? "#080808" : "#bbbbbb" }}>
            <InboxIcon />
          </div>
        </BtnBase>
      ) : null}
      {profile?.links?.length > 0 ? (
        <BtnBase onClick={() => handleChangeTab("links")}>
          <div style={{ color: tab === "links" ? "#080808" : "#bbbbbb" }}>
            <InsertLinkIcon />
          </div>
        </BtnBase>
      ) : null}
    </ProfileNavContainer>
  );
};
const BtnBase = styled(ButtonBase)`
  width: 100%;
  height: 100%;
`;
export default memo(ProfileNav);
