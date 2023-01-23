/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgressMode } from "store/actions/_MainAction";
import styled, { keyframes } from "styled-components";
import "./LoadingDotPlus.css";

const LodingDotPlus = ({
  isRelative = true,
  isFixed = false,
  isBg = true,
  isUser = false,
  ng = false,
  loading = true,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let t;
    clearTimeout(t);
    console.log("otest1");
    dispatch(setProgressMode("start"));
    return () => {
      clearTimeout(t);
      t = setTimeout(() => {
        console.log("otest");
        dispatch(setProgressMode("done"));
      }, 100);
    };
  }, []);
  useEffect(() => {
    // if (loading === false) {
    //   setTimeout(() => {
    //     setL(null);
    //   }, 1000);
    // }
  }, [loading]);
  return (
    <>
      <Container
        style={{
          position: isFixed ? "fixed" : isUser ? "unset" : "absolute",
        }}
        className={`${isBg ? "globalLoading" : "transparent"} ${
          isRelative ? "relative" : ""
        }`}
      >
        <div className="ball-loader">
          <div className="ball-loader-ball dotLoaderColor ball1"></div>
          <div className="ball-loader-ball dotLoaderColor ball2"></div>
          <div className="ball-loader-ball dotLoaderColor ball3"></div>
        </div>
      </Container>
    </>
  );
};

const progressAnimate = keyframes`
    0% {
      width: 1%;
  
}
    5% {
      width: 10%;
  
}

70% {
  width: 70%;
    }

`;

const CompletedProgress = keyframes`
  from {
    width: 70%;
  }
  to{ 
    width: 100%;
  }
`;

const NgProgress = styled.div`
  position: fixed;
  top: 0;
  /* width: 0; */
  animation: ${progressAnimate} 3s cubic-bezier(0, 0.07, 1, 0.54);
  animation-fill-mode: forwards;
  height: 3px;
  z-index: 999999999999999;
  background: linear-gradient(270deg, #3f51b5, #00bcd4);
  left: 0;
  transition: all 0.5s ease-in-out;
  &.doneProgress {
    animation: ${CompletedProgress} 3s cubic-bezier(0, 0.07, 1, 0.54) alternate !important;
    transition: all 0.5s ease-in-out !important;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999999;
`;

export default LodingDotPlus;
