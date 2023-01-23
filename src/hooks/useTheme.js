/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { setToLS, getFromLS } from "../utilities/theme";

const useTheme = () => {
  const themes = getFromLS("themes");
  const [theme, setTheme] = useState(themes.data.default);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode) => {
    setToLS("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = getFromLS("theme");
    localTheme ? setTheme(localTheme) : setTheme(themes.data.default);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};

export default useTheme;
