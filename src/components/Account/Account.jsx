import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ErrorImages from "components/Utilities/ErrorImages";
import { Fragment } from "react";
import AvatarLoading from "components/Utilities/AvatarLoading";
import { memo } from "react";
import { setLastScroll } from "store/actions/_MainAction";

const Account = () => {
  const {
    account: user,
    image,
    loading,
  } = useSelector(({ account }) => account);
  const { allowToCreate: allow } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  if (loading)
    return (
      <div
        className=""
        style={{
          borderBottom: "1px solid #f3e4d1",
          marginBottom: "17px",
          paddingBottom: 3,
        }}
      >
        <AvatarLoading />
      </div>
    );
  return (
    <Container
      className="toolbarBackground customToolbar homeAccountToolbarBackground"
      onClick={
        allow === 1
          ? () => history.push(`/profile/${user?.token}`)
          : () => {
              dispatch(setLastScroll(0));
              history.push(`/login`);
            }
      }
    >
      <Fragment>
        <Welcome>
          {user?.welcome ? user?.welcome : "دوست عزیز خوش آمدید."}
        </Welcome>
        <div className="flex align-middle">
          <ErrorImages
            height={38}
            width={38}
            person
            sizeIcon="2.7rem"
            src={image}
          />
        </div>
      </Fragment>
    </Container>
  );
};
const Welcome = styled.div`
  font-size: 0.8rem;
`;
const Container = styled.div`
  height: 42px;
  display: grid;
  position: sticky;
  top: 0;
  z-index: 99;
  grid-template-columns: auto 3fr;
  align-items: center;
  justify-items: self-end;
  padding: 0 10px;
  cursor: pointer;
`;
export default memo(Account);
