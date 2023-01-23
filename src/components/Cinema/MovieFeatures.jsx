import styled from "styled-components";

const MovieFeatures = () => {
  return (
    <Container>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
      <Item>
        <div className="">ژانر</div>
        <div className="">کمدی , اکشن</div>
      </Item>
    </Container>
  );
};

const Container = styled.div``;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  &:not(:last-of-type) {
    border-bottom: 1px solid #d2d2d2;
  }
`;

export default MovieFeatures;
