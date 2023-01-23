/* eslint-disable react-hooks/exhaustive-deps */
import Mireseh from "container/Mireseh";
import React, { useState, useEffect } from "react";
// import { EventsLazy, HomeLazy, MediaLazy, PostLazy } from 'AppLazy';
// import { Suspense } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import useTheme from "./hooks/useTheme";
import Context from "context/Context";
import { useDispatch, useSelector } from "react-redux";
import { hasTouchScreenDevice } from "store/actions/_MainAction";

function App() {
  const { theme, themeLoaded } = useTheme();
  const { alert } = useSelector(({ _MainReducer }) => _MainReducer);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const dispatch = useDispatch();
  const [homeMediaImageSize, setHomeMediaImages] = useState([]);
  useEffect(() => {
    // document.getElementsByTagName("html")[0].className = "homeSlideList";
    // document.getElementsByTagName("body")[0].className = "homeSlideList";
    setSelectedTheme(theme);
  }, [themeLoaded]);
  const setHomeMediaImageSize = (item) => {
    setHomeMediaImages(item);
  };
  const isTouchScreenDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints;
  };
  useEffect(() => {
    if (isTouchScreenDevice()) {
      dispatch(hasTouchScreenDevice(true));
    } else dispatch(hasTouchScreenDevice(false));
  }, []);
  return (
    <Context.Provider value={{ homeMediaImageSize, setHomeMediaImageSize }}>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Container
            style={{ background: "transparent" }}
            hasAlert={alert?.mode?.length > 0}
          >
            <Mireseh />
          </Container>
        </ThemeProvider>
      )}
    </Context.Provider>
  );
}

const Container = styled.div`
  position: ${({ hasAlert }) => (hasAlert ? "absolute" : "unset")};
  right: ${({ hasAlert }) => (hasAlert ? "0" : "unset")};
  width: 100%;
  height: 100%;
`;
export default App;
