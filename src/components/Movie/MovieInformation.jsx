import { MovieInformation as Container, SectionTitle } from "./Movie.styled";

const MovieInformation = () => {
  return (
    <Container>
      <SectionTitle style={{ padding: 0 }}>سایر اطلاعات</SectionTitle>
      <div className="list">
        <div className="item">
          <div className="title">نوع</div>
          <div className="content">فیلم سینمایی</div>
        </div>
        <div className="item">
          <div className="title">نوع</div>
          <div className="content">فیلم سینمایی</div>
        </div>
        <div className="item">
          <div className="title">نوع</div>
          <div className="content">فیلم سینمایی</div>
        </div>
        <div className="item">
          <div className="title">نوع</div>
          <div className="content">فیلم سینمایی</div>
        </div>
        <div className="item">
          <div className="title">نوع</div>
          <div className="content">فیلم سینمایی</div>
        </div>
      </div>
    </Container>
  );
};

export default MovieInformation;
