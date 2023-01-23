import { useEffect, useState } from "react";
import ThemeWrapperContext from "../context/ThemeWrapperContext";

const withThemeWrapper = (Component) => (props) => {
  const [theme, setTheme] = useState({});
  const [colors, setColors] = useState({});
  useEffect(() => {
    const theme = localStorage.getItem("themes");
    const parse = JSON.parse(theme);
    const { data } = parse;
    const dataKey = Reflect.ownKeys(data);
    const dataValue = data[dataKey];
    const colors = dataValue?.colors;
    setColors(colors);
    setTheme(dataValue);
  }, []);
  return (
    <ThemeWrapperContext.Provider value={{ theme, setTheme, colors }}>
      <Component {...props} />
    </ThemeWrapperContext.Provider>
  );
};

export default withThemeWrapper;
