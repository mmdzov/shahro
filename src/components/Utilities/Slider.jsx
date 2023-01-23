import React, { useRef, useState, Fragment, useEffect } from "react";
import random from "../../assets/imgs/random.jpg";
import classes from "components/Utilities/Slider.module.css";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import ImageIcon from "@material-ui/icons/Image";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";
import "./Slider.css";
import { setVideoTime } from "store/actions/mediaActions";
const Slider = ({
  slides,
  post = false,
  media = false,
  images,
  title,
  ads = false,
  h = 240,
}) => {
  const ref = useRef([]);
  const [height, setHeight] = useState(h);
  const [mySlides, setMySlides] = useState(slides);
  const { hasTouchScreen } = useSelector(({ _MainReducer }) => _MainReducer);
  const autoPlayVideo = (ref) => {
    ref.forEach((r) => {
      if (r.current?.parentElement?.classList?.contains("slide-current")) {
        if (r.current?.tagName === "VIDEO") {
          r.current?.play();
        }
      }
    });
  };
  const pauseAutoPlayVideo = (ref) => {
    ref.forEach((r) => {
      if (r?.current?.parentElement?.classList.contains("slide-current")) {
        if (r?.current?.tagName === "VIDEO") {
          r?.current?.pause();
        }
      }
    });
  };
  const afterSlideRun = () => {
    autoPlayVideo(ref.current);
    ref.current.forEach((r) => {
      if (r.current?.parentElement?.classList?.contains("slide-current")) {
        const h = r?.current?.getBoundingClientRect()?.height;
        setHeight(h === 0 ? 240 : h);
      }
    });
  };
  const beforSlideRun = () => {
    pauseAutoPlayVideo(ref.current);
  };

  const mutingVideo = (e) => {
    // if (e.target.muted === true) {
    //   e.target.muted = false;
    // } else {
    //   e.target.muted = true;
    // }
  };
  const handleLoad = () => {
    if (ref?.current?.length > 0) {
      const r = ref.current[0];
      if (r?.current) {
        try {
          r?.current?.play();
        } catch (e) {}
      }
      const h = r?.current?.getBoundingClientRect()?.height;
      setHeight(h === 0 ? 240 : h);
    }
  };
  const handleResize = () => {
    let currentSlide = document
      .getElementsByClassName("slide-current")[0]
      .children.item(0)
      .children.item(0);
    let heightOfCurrentSlide = currentSlide.getBoundingClientRect().height;
    const getFullScreenElement =
      document.getElementsByClassName("vjs-fullscreen")[0];
    const videoElement = getFullScreenElement?.children?.item(0);
    if (getFullScreenElement) {
      if (heightOfCurrentSlide < window.innerHeight) {
        console.log(videoElement);
        videoElement?.classList.add("centeredVideo");
        videoElement?.classList.remove("unCenteredVideo");
      }
    } else {
      currentSlide?.classList.add("unCenteredVideo");
      currentSlide?.classList.remove("centeredVideo");
    }

    setHeight(heightOfCurrentSlide);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleError = (id) => {
    const slds = [...mySlides];
    const index = slds?.findIndex((item) => item.id === id);
    slds[index].error = true;
    setMySlides(slds);
  };
  const handleErrorAds = (token) => {
    const slds = [...mySlides];
    console.log(token);
    const index = slds?.findIndex((item) => item.token === token);
    slds[index].error = true;
    setMySlides(slds);
  };
  const handleLoadVideo = () => {
    console.log("object");
  };
  const handlePauseVideo = () => {
    console.log("clicked");
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    var highlightedItems = document.querySelectorAll(".video-js-default");
    // videojs(highlightedItems?.[0]).play();
    highlightedItems.forEach(function (userItem) {
      setMounted(true);
      videojs(userItem);
    });
    let pause = document.getElementsByClassName("vjs-icon-placeholder")[0];
    pause?.parentElement?.addEventListener("click", handlePauseVideo);
  }, []);
  const dispatch = useDispatch();
  const { videotime } = useSelector(({ media }) => media);
  const handleChangeVideo = (e, index) => {
    if (mounted && videotime[index] > 0) {
      e.target?.play();
      e.target.currentTime = videotime[index];
      setMounted(false);
    }
    const getVideoTimes = { ...videotime };
    getVideoTimes[index] = e.target.currentTime;
    dispatch(setVideoTime(getVideoTimes));
  };

  let slider = null;
  if (post) {
    slider = (
      <Container height={height + "px"} className={`mt-1`}>
        <Carousel
          afterSlide={afterSlideRun}
          beforeSlide={beforSlideRun}
          defaultControlsConfig={{
            pagingDotsContainerClassName: `${classes.DotsContainer} `,
            pagingDotsClassName: `${classes.Dots}`,
            pagingDotsStyle: {
              fill: "#4e99e9",
            },
            // nextButtonText: "بعدی",
            // prevButtonText: "قبلی",
          }}
          renderCenterLeftControls={
            !hasTouchScreen
              ? ({ previousSlide }) => (
                  <Button onClick={previousSlide}>
                    <ChevronLeftIcon />
                  </Button>
                )
              : () => {}
          }
          renderCenterRightControls={
            !hasTouchScreen
              ? ({ nextSlide }) => (
                  <Button onClick={nextSlide}>
                    <ChevronRightIcon />
                  </Button>
                )
              : () => {}
          }
        >
          {mySlides?.map((slide, i, slides) => {
            ref.current = slides.map(
              (_, i) => ref.current[i] ?? React.createRef()
            );
            if (slide.type === "image") {
              return (
                <>
                  {slide.error ? (
                    <ErrorIcon>
                      <ImageIcon />
                    </ErrorIcon>
                  ) : (
                    <Img
                      id={slide.id}
                      onLoad={handleLoad}
                      onError={() => handleError(slide.id)}
                      src={slide.url}
                      key={slide.id}
                      alt={`${title}`}
                      cover={slide?.cover}
                      ref={ref.current[i]}
                      className={`${classes.BgError} defaultImage`}
                    />
                  )}
                </>
              );
            } else {
              return (
                <Video
                  key={slide.url}
                  ref={ref.current[i]}
                  // muted
                  onLoad={handleLoadVideo}
                  controls
                  onClick={mutingVideo}
                  poster={slide?.cover}
                  onTimeUpdate={(e) => handleChangeVideo(e, i)}
                  style={{ position: "unset", height: "revert" }}
                  cover={slide?.cover}
                  width="100%"
                  height="100%"
                  className={`${classes.Slider} defaultImage video-js video-js-default vjs-default-skin`}
                >
                  <source
                    src={slide.url}
                    type="video/mp4"
                    className="BgError"
                  />
                </Video>
              );
            }
          })}
        </Carousel>
      </Container>
    );
  } else if (ads) {
    slider = (
      <Container height={height + "px"} className={`mt-1`}>
        <Carousel
          afterSlide={afterSlideRun}
          beforeSlide={beforSlideRun}
          defaultControlsConfig={{
            pagingDotsContainerClassName: `${classes.DotsContainer} `,
            pagingDotsClassName: `${classes.Dots}`,
            pagingDotsStyle: {
              fill: "#4e99e9",
            },
            // nextButtonText: "بعدی",
            // prevButtonText: "قبلی",
          }}
          renderCenterLeftControls={
            !hasTouchScreen
              ? ({ previousSlide }) => (
                  <Button onClick={previousSlide}>
                    <ChevronLeftIcon />
                  </Button>
                )
              : () => {}
          }
          renderCenterRightControls={
            !hasTouchScreen
              ? ({ nextSlide }) => (
                  <Button onClick={nextSlide}>
                    <ChevronRightIcon />
                  </Button>
                )
              : () => {}
          }
        >
          {mySlides?.map((slide, i, slides) => {
            ref.current = slides.map(
              (_, i) => ref.current[i] ?? React.createRef()
            );
            return (
              <Fragment key={slide.token}>
                {slide.error ? (
                  <ErrorIcon>
                    <ImageIcon />
                  </ErrorIcon>
                ) : (
                  <Img
                    id={slide.token}
                    onLoad={handleLoad}
                    onError={() => handleErrorAds(slide.token)}
                    src={slide.image}
                    key={slide.token}
                    cover={slide?.cover}
                    alt={`آگهی`}
                    ref={ref.current[i]}
                    className={`${classes.BgError} defaultImage`}
                  />
                )}
              </Fragment>
            );
          })}
        </Carousel>
      </Container>
    );
  } else if (media) {
    if (images.length > 1) {
      slider = (
        <div className={`${classes.SliderHeight}`}>
          <Carousel
            defaultControlsConfig={{
              pagingDotsContainerClassName: `${classes.DotsContainer}`,
              pagingDotsClassName: `${classes.Dots}`,
              pagingDotsStyle: {
                fill: "#4e99e9",
              },
              // nextButtonText: "بعدی",
              // prevButtonText: "قبلی",
            }}
            renderCenterLeftControls={
              !hasTouchScreen
                ? ({ previousSlide }) => (
                    <Button onClick={previousSlide}>
                      <ChevronLeftIcon />
                    </Button>
                  )
                : () => {}
            }
            renderCenterRightControls={
              !hasTouchScreen
                ? ({ nextSlide }) => (
                    <Button onClick={nextSlide}>
                      <ChevronRightIcon />
                    </Button>
                  )
                : () => {}
            }
          >
            {images.map((slide, i) => (
              <img
                src={slide}
                key={slide}
                className={`w-full object-cover ${classes.BgError}`}
                alt={`slide ${i}`}
              />
            ))}
          </Carousel>
        </div>
      );
    } else if (images.length === 1) {
      slider = (
        <img
          className={`${classes.SliderHeight} ${classes.BgError} w-full object-cover`}
          src={images}
          alt="post"
        />
      );
    } else {
      slider = (
        <img
          src={random}
          alt="random"
          className={`${classes.SliderHeight} w-full object-cover`}
        />
      );
    }
  }

  return <div style={{ direction: "rtl" }}>{slider}</div>;
};

const Video = styled.video`
  background: url(${({ cover }) => cover}) no-repeat center center/cover;
`;
const Img = styled.img``;
const ErrorIcon = styled.div`
  height: 100%;
  width: 100%;
  z-index: 99999999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9e9e9e;
  & > svg {
    font-size: 4.9rem;
  }
`;

const Button = styled.button`
  background: #0000004d;
  color: #bdbdbd;
  & > svg {
    font-size: 2.6rem;
  }
`;

const Container = styled.div`
  height: ${({ height }) => (height ? height : "240px")};
  & .slider-control-bottomcenter > ul {
    transform: rotate(180deg);
    top: -5px !important;
  }
`;

export default Slider;
