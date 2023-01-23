// import { useSelector } from "react-redux";
import styled from "styled-components";

function ListEvents({ children }) {
  // const { isMobileDevice } = useSelector(({ _MainReducer }) => _MainReducer);

  return <Container style={{ paddingTop: 0 }}>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding-top: 13px; */
  /* & .evItem:last-of-type {
    padding-bottom: 24px !important;
  } */
`;

export default ListEvents;
