import { MovieHeader as Container, MovieHeaderLeft } from "./Movie.styled";
import GradeIcon from "@material-ui/icons/Grade";
import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";
import toPersian from "utilities/ToPersian";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
const MovieHeader = () => {
  return (
    <Container>
      <img
        src="https://video-extras.cafebazaar.ir/filimo/6c4bf48d-111d-49e5-9e52-e59bbad725ae?x-img=v1/watermark,x_190,y_360,image_aHR0cHM6Ly92aWRlby1leHRyYXMuY2FmZWJhemFhci5pci9sb2dvcy9maWxpbW8td2hpdGUtMzJweC5qcGc="
        alt=""
        className="BgError"
      />
      <MovieHeaderLeft>
        <div className="title">رزیدنت اویل : آخرالزمان</div>
        <div className="description">وحشتعلمی - تخیلی</div>
        <div className="from">فیلیمو</div>
        <div className="rate">
          <div className="rateStars">
            <GradeIcon />
            <GradeIcon />
            <GradeIcon />
            <GradeIcon />
            <GradeOutlinedIcon />
          </div>
          <div className="rateCommentCount">
            ( {toPersian(1068)} ) <span>نظر</span>
          </div>
        </div>
        <div className="playIcon">
          <div className="">
            <span>پخش</span>
            <div>
              <PlayArrowIcon />
            </div>
          </div>
        </div>
      </MovieHeaderLeft>
    </Container>
  );
};

export default MovieHeader;
