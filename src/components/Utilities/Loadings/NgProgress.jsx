import styled from "styled-components";

const NgProgress = () => {
  return <Container />;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 70%;
  height: 3px;
  z-index: 999999999999999;
  background: linear-gradient(270deg, #3f51b5, #00bcd4);
  left: 0;
`;

export default NgProgress;
