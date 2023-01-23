import Session from "components/Session/Session";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import useLoading from "hooks/useLoading";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { clearSessions, getActiveSessions } from "store/actions/accountAction";
import styled from "styled-components";
const Sessions = () => {
  const { sessions: sess } = useSelector(({ account }) => account);
  const { loading } = useLoading(sess);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveSessions());
    return () => dispatch(clearSessions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      <Helmet>
        <title>نشست های فعال - اپلیکیشن شهری میرسه</title>
        <meta
          name="keywords"
          content="نشست های فعال - اپلیکیشن شهری میرسه"
        ></meta>
      </Helmet>
      <Session />
    </Container>
  );
};
const Container = styled.div``;
export default Sessions;
