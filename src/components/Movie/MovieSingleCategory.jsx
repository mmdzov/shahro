import {
  MovieSingleCategory as Container,
  MovieSingleCategoryItem,
} from "./Movie.styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const MovieSingleCategory = () => {
  return (
    <Container className="">
      <MovieSingleCategoryItem>
        <div className="title">خانه</div>
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
      </MovieSingleCategoryItem>
      <MovieSingleCategoryItem>
        <div className="title">خانه</div>
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
      </MovieSingleCategoryItem>
      <MovieSingleCategoryItem>
        <div className="title">خانه</div>
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
      </MovieSingleCategoryItem>
      <MovieSingleCategoryItem>
        <div className="title">خانه</div>
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
      </MovieSingleCategoryItem>
      <MovieSingleCategoryItem>
        <div className="title">خانه</div>
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
      </MovieSingleCategoryItem>
    </Container>
  );
};

export default MovieSingleCategory;
