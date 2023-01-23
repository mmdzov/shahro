import Flickity from "react-flickity-component";
import { useEffect, useState } from "react";
import { memo } from "react";
import "./SlideTemp.css";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";

const SlideTempList = ({
  children,
  isRender = true,
  showBtn = true,
  height,
  initialIndex = 0,
  reloadOnUpdate = true,
  forceRender = false,
  ...props
}) => {
  const [flkty, setFlkty] = useState(null);
  const { hasTouchScreen } = useSelector(({ _MainReducer }) => _MainReducer);
  useEffect(() => {
    // let timeout;
    if (flkty) {
      flkty.on("dragStart", () =>
        flkty.slider.childNodes.forEach((slide) => {
          // clearTimeout(timeout);
          slide.style.pointerEvents = "none";
        })
      );
      flkty.on("dragEnd", () =>
        flkty.slider.childNodes.forEach((slide) => {
          setTimeout(() => {
            slide.style.pointerEvents = "all";
            // clearTimeout(timeout);
          }, 1300);
        })
      );
    }
    // return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { isMobileDevice } = useSelector(({ _MainReducer }) => _MainReducer);
  const handleFlkty = (e) => {
    setFlkty(e);
  };
  if (!isRender) return <div></div>;
  return (
    <SlideTempListContainer h={height}>
      {forceRender || !isMobileDevice ? (
        <Flickity
          {...props}
          className={`carousel`}
          elementType={"div"}
          options={{
            freeScroll: true,
            prevNextButtons: hasTouchScreen ? false : showBtn,
            contain: true,
            pageDots: false,
            rightToLeft: true,
            freeScrollFriction: 0.03,
            cellAlign: "center",
            initialIndex,
          }}
          flickityRef={handleFlkty}
          static
          reloadOnUpdate={reloadOnUpdate}
        >
          {children}
        </Flickity>
      ) : (
        <Scroll style={{ display: "flex", overflowX: "auto" }}>
          {children}
        </Scroll>
      )}
    </SlideTempListContainer>
  );
};
const SlideTempListContainer = styled.div`
  & .flickity-viewport {
    height: ${({ h }) => h + "!important" || "auto"};
  }
  & .flickity-slider > a {
    /* margin-left: 0 !important;
    margin-right: 0 !important;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent; */
  }
`;
export default memo(SlideTempList);
