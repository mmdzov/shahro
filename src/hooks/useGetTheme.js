import { useEffect, useState } from "react";

const useGetTheme = () => {
  const [colors, setColors] = useState({});
  const [theme, setTheme] = useState();
  useEffect(() => {
    const theme = localStorage.getItem("themes");
    const parse = JSON.parse(theme);
    const { data } = parse;
    const dataKey = Reflect.ownKeys(data);
    const dataValue = data[dataKey];
    const colors = dataValue?.colors;
    setColors(colors);
    setTheme(theme);
  }, []);
  return { colors, theme };
};

export default useGetTheme;
