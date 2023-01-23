import { MovieAgents as Container, SectionTitle } from "./Movie.styled";

const MovieAgents = () => {
  return (
    <Container>
      <SectionTitle className="" style={{ padding: "0" }}>
        عوامل
      </SectionTitle>
      <div className="list">
        <div className="item">
          <div className="title">کارگردان</div>
          <div className="description">الکساندر ویت</div>
        </div>
        <div className="item">
          <div className="title">تهیه کننده</div>
          <div className="description">پل دبلیو. اس. اندرسون</div>
        </div>
        <div className="item">
          <div className="title">بازیگران</div>
          <div className="description">
            میلا یوویچ ، سیه نا گیلری ، اودد فهر ، توماس کرتشمن ، سوفی واواسور ،
            رزاق ادوتی
          </div>
        </div>
        <div className="item">
          <div className="title">فیلم نامه نویس</div>
          <div className="description">پل دبلیو. اس. اندرسون</div>
        </div>
      </div>
    </Container>
  );
};

export default MovieAgents;
