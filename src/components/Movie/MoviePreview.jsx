/* eslint-disable react-hooks/exhaustive-deps */
import SlideTempList from "components/SlideTemp/SlideTempList";
import ProductModal from "components/Store/ProductModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlexibleMoviePreview,
  MoviePreview as Container,
  SectionTitle,
} from "./Movie.styled";
import MovieGallery from "./MovieGallery";

const MoviePreview = () => {
  const [LargerView, setLargerView] = useState("");
  const { isMobileDevice } = useSelector(({ _MainReducer }) => _MainReducer);
  const [largerMobileView, setLargerMobileView] = useState(-1);
  const handleLargerView = (e, i, img, mode) => {
    let src;
    let index;
    if (img) {
      src = img;
    } else {
      src = e?.currentTarget?.src;
    }
    if (i) {
      index = i;
      setLargerMobileView(index);
    } else {
      index = e.currentTarget.getAttribute("dataIndex");
    }
    if (isMobileDevice) {
      document.body.classList.add("overflowHiddenMobile");
      setLargerMobileView(index);
    } else {
      if (!i) {
        document.body.classList.add("overflowHidden");
        setLargerView(src);
      }
    }
  };

  const handleCloseModal = () => {
    // if (isMobileDevice) {
    document.body.classList.remove("overflowHiddenMobile");
    setLargerMobileView(-1);
    // } else {
    document.body.classList.remove("overflowHidden");
    setLargerView("");
    // }
  };

  const [gallery] = useState([
    `https://video-extras.cafebazaar.ir/filimo/def87c2b-9c00-4da2-966e-d16b0f9d8883?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/b65810e6-541a-4442-b8f9-efb454914d3b?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/fe8bcaca-238c-4d36-a937-e41a4a286848?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/bf635a0b-2288-409c-958a-ce6dd1b53699?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/e4339b3d-1b02-4a67-abff-95a7565a0500?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/4a6d5453-654f-4aa2-9b2a-d96fcdf797c9?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/65cb622f-09e7-4c03-b8e2-a6a64f1c84da?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/b2dd84de-9403-482f-a51a-97abd17b0a93?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
    `https://video-extras.cafebazaar.ir/filimo/1f4b1f56-ad7d-492d-b75a-90026c713825?x-img=v1/resize,h_800/format,type_webp,lossless_false`,
  ]);
  const [focused, setFocused] = useState(false);
  const handleDownPointer = (e) => {
    setFocused(Date.now());
  };
  const handleUpPointer = (e) => {
    const now = Date.now();
    if (now - focused <= 180) {
      handleLargerView(e);
    }
  };
  const [width, setWidth] = useState(0);
  const getImageWidth = () => {
    const galleryTouchDevice =
      document.getElementsByClassName("galleryTouchDevice")[1];
    const w = galleryTouchDevice?.getBoundingClientRect()?.width;
    console.log(galleryTouchDevice, width, w);
    setWidth(w);
  };
  useEffect(() => {
    window.addEventListener("resize", getImageWidth);
  }, []);
  useEffect(() => {
    getImageWidth();
  }, [gallery]);
  return (
    <Container>
      <SectionTitle>پیش نمایش</SectionTitle>

      {LargerView?.length > 0 ? (
        <ProductModal
          style={{ padding: "0px", background: "#000000f0" }}
          h="auto"
          width="auto"
          mw="fit-content"
          blur={handleCloseModal}
          onClick={handleCloseModal}
        >
          <img
            src={LargerView}
            alt=""
            style={{
              cursor: "pointer",
              marginTop: "-2px",
              filter: "saturate(1.5)",
            }}
          />
        </ProductModal>
      ) : null}
      {largerMobileView > -1 ? (
        <MovieGallery
          gallery={gallery}
          handleHideGallery={handleCloseModal}
          index={largerMobileView}
        />
      ) : null}
      {!isMobileDevice ? (
        <SlideTempList reloadOnUpdate={false}>
          {gallery?.map((item, index) => (
            <div
              className="imagePreview"
              tabIndex="-1"
              onPointerDown={handleDownPointer}
            >
              <img
                onPointerUp={handleUpPointer}
                src={item}
                alt=""
                key={index}
                className="BgError"
                dataIndex={index}
              />
            </div>
          ))}
        </SlideTempList>
      ) : (
        <FlexibleMoviePreview>
          {gallery?.slice(0, 1)?.map((item, index) => (
            <div
              className=""
              style={{
                padding: "0 5px",
                marginBottom: "5px",
              }}
              onClick={handleLargerView}
              dataIndex={index}
            >
              <img
                src={item}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: "100%",
                }}
                key={index}
                className="BgError"
              />
            </div>
          ))}
          <div className="">
            {gallery?.slice(0, 8)?.map((item, index) => (
              <div
                className=""
                onClick={(e) => handleLargerView(e, index, item)}
                dataIndex={index}
              >
                <img
                  src={item}
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: index > 0 ? (width > 0 ? width : "100%") : "100%",
                  }}
                  key={index}
                  className="BgError galleryTouchDevice"
                />
                {gallery.length > 8 && index === 7 ? (
                  <span
                    onClick={(e) => handleLargerView(e, index, item, "more")}
                  >
                    +{gallery?.slice(8)?.length}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </FlexibleMoviePreview>
      )}
    </Container>
  );
};

export default MoviePreview;
