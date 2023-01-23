import { MovieBottom } from "components/Movie/Movie.styled";
import MovieAgents from "components/Movie/MovieAgents";
import MovieComment from "components/Movie/MovieComment";
import MovieDescription from "components/Movie/MovieDescription";
import MovieHeader from "components/Movie/MovieHeader";
import MovieInformation from "components/Movie/MovieInformation";
import MoviePreview from "components/Movie/MoviePreview";
import MovieSingleCategory from "components/Movie/MovieSingleCategory";
import MovieSlider from "components/Movie/MovieSlider";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import Ripples from "components/Utilities/Ripples";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Movie = () => {
  const { loading } = useSelector(({ _MainReducer }) => _MainReducer);

  if (loading.mode === "adsToHome")
    return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container>
      <MovieSingleCategory />
      <div>
        <MovieHeader />
        <MovieDescription />
        <MovieBottom className="">
          <MovieAgents />
          <MovieInformation />
        </MovieBottom>
        <MoviePreview />
        <MovieSlider title="فیلم های مرتبط" />
        <MovieSlider title="فیلم های مشابه" />
        <MovieSlider title="فیلم های میلا یوویچ" />
        <MovieSlider title="فیلم های مرتبط" />
        <MovieBottom className="">
          <MovieComment />
        </MovieBottom>
      </div>
      <BtnContainer>
        <Ripples delay={300}>
          {true ? (
            <Btn className="acceptBtn" style={{ cursor: "pointer" }}>
              رزرو بلیط
            </Btn>
          ) : (
            <Btn className="acceptBtnMuted" style={{ cursor: "pointer" }}>
              رزرو بلیط
            </Btn>
          )}
        </Ripples>
      </BtnContainer>
    </Container>
  );
};

const Container = styled.div`
  /* padding: 0 15px; */
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 70px;
  @media (max-width: 640px) {
    margin-bottom: 50px;
  }
`;

const BtnContainer = styled.div`
  position: fixed;
  bottom: 5px;
  width: 100%;
  right: 0;
`;

const Btn = styled.div`
  margin: 0 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

export default Movie;
