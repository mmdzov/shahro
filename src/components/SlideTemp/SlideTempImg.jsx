/* eslint-disable react-hooks/exhaustive-deps */
import { ErrImage, Image, ListImg } from "./SlideTemp.styled";
import ImageIcon from "@material-ui/icons/Image";
import styled, { keyframes } from "styled-components";
import { memo, useCallback, useEffect, useState } from "react";
import LineEllipsis from "components/Utilities/LineEllipsis";

const SlideTempImg = ({
  isError,
  src,
  onProblem = () => {},
  token,
  name,
  isAds = false,
  height,
  hasAdsCategory = false,
  ...props
}) => {
  const [err, setErr] = useState(false);
  const handleErr = useCallback(
    (e) => {
      e.preventDefault();
      if (!err) {
        setErr(true);
        onProblem(token);
      }
    },
    [onProblem, token]
  );
  const [showTitle, setShowTitle] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    let ti;
    ti = setTimeout(() => {
      clearTimeout(ti);
      if (!showTitle) {
        setShowTitle(true);
      }
    }, 500);
    return () => clearTimeout(ti);
  }, []);
  return (
    <Image {...props} className={`${isAds ? "activeAds" : ""}`} h={err}>
      {name ? (
        <NameContainer className={`${isAds ? "activeAds" : ""}`}>
          <Name
            style={{
              color: err ? "#404040" : "white",
              width: "100%",
              textAlign: isAds || hasAdsCategory ? "center" : "right",
            }}
          >
            <CategoryTitle className={showTitle ? "showTitle" : ""}>
              <LineEllipsis text={name} ellipsis="..." maxLine="1" />
            </CategoryTitle>
            {/* {showTitle ? ( */}
            {/* ) : null} */}
          </Name>
        </NameContainer>
      ) : null}
      {!err ? (
        <ListImg
          src={src}
          alt=""
          className="BgError"
          onError={handleErr}
          {...props}
          style={{
            height: isAds ? 108 : height ? height : 150,
            borderRadius: 5,
          }}
        />
      ) : null}
      <div
        className={err ? "BgError" : ""}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // background: "white",
        }}
      ></div>
      {isError || !src ? (
        <ErrImage>
          <ImageIcon style={{ fontSize: " 50px", color: "#949494" }} />
        </ErrImage>
      ) : null}
    </Image>
  );
};
const TitleAnimate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;
const CategoryTitle = styled.div`
  opacity: 0;
  &.showTitle {
    animation: ${TitleAnimate} 0.6s cubic-bezier(0, 0.07, 1, 0.54);
    animation-fill-mode: forwards;
  }
`;
const Name = styled.div`
  width: 100%;
  text-align: center;
`;
const NameContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0 5px;
  &.activeAds {
    & > div {
      text-align: center !important;
      width: 100%;
    }
  }
`;
export default memo(SlideTempImg);
