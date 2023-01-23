import SlideTempList from "components/SlideTemp/SlideTempList";
import { MovieGallery as Container } from "./Movie.styled";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const MovieGallery = ({ gallery, index, handleHideGallery = () => {} }) => {
  return (
    <Container>
      <div className="arrowBack" onClick={handleHideGallery}>
        <ArrowForwardIcon />
      </div>
      <SlideTempList initialIndex={+index} forceRender>
        {gallery.map((item) => (
          <img
            src={item}
            className="BgError"
            alt=""
            dataIndex={index}
            key={index}
            id={index}
          />
        ))}
      </SlideTempList>
    </Container>
  );
};

export default MovieGallery;
