import SlideTempList from "components/SlideTemp/SlideTempList";
import { MovieSlider as Container, SectionTitle } from "./Movie.styled";
import { ListItemContainer } from "components/SlideTemp/SlideTemp.styled";

const MovieSlider = ({ title, list }) => {
  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <SlideTempList height="270px">
        {/* {list?.map(item => (
        <div className="item">
          <img
            src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
            alt=""
            className="BgError"
          />
          <div className="title">
            رزیدنت اویل <span>:</span>
          </div>
          <div className="subtitle">قسمت پایانی</div>
          <div className="director">پل دبلیو. اس. اندرسون</div>
        </div>           
               ))} */}
        <ListItemContainer style={{ display: "flex" }}>
          <div className="item">
            <img
              src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
              alt=""
              className="BgError"
            />
            <div className="title">
              رزیدنت اویل <span>:</span>
            </div>
            <div className="subtitle">قسمت پایانی</div>
            <div className="director">پل دبلیو. اس. اندرسون</div>
          </div>
        </ListItemContainer>
        <ListItemContainer style={{ display: "flex" }}>
          <div className="item">
            <img
              src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
              alt=""
              className="BgError"
            />
            <div className="title">
              رزیدنت اویل <span>:</span>
            </div>
            <div className="subtitle">قسمت پایانی</div>
            <div className="director">پل دبلیو. اس. اندرسون</div>
          </div>
        </ListItemContainer>
        <ListItemContainer style={{ display: "flex" }}>
          <div className="item">
            <img
              src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
              alt=""
              className="BgError"
            />
            <div className="title">
              رزیدنت اویل <span>:</span>
            </div>
            <div className="subtitle">قسمت پایانی</div>
            <div className="director">پل دبلیو. اس. اندرسون</div>
          </div>
        </ListItemContainer>
        <ListItemContainer style={{ display: "flex" }}>
          <div className="item">
            <img
              src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
              alt=""
              className="BgError"
            />
            <div className="title">
              رزیدنت اویل <span>:</span>
            </div>
            <div className="subtitle">قسمت پایانی</div>
            <div className="director">پل دبلیو. اس. اندرسون</div>
          </div>
        </ListItemContainer>
        <ListItemContainer style={{ display: "flex" }}>
          <div className="item">
            <img
              src="https://video-extras.cafebazaar.ir/filimo/27e1dced-feee-42e6-89fe-39a2efcb718b?x-img=v1/resize,h_240,w_180/format,type_webp,lossless_false"
              alt=""
              className="BgError"
            />
            <div className="title">
              رزیدنت اویل <span>:</span>
            </div>
            <div className="subtitle">قسمت پایانی</div>
            <div className="director">پل دبلیو. اس. اندرسون</div>
          </div>
        </ListItemContainer>
      </SlideTempList>
    </Container>
  );
};

export default MovieSlider;
