import { createContext } from "react";

const ThemeWrapperContext = createContext({
  setTheme: () => {},
  colors: {},
  theme: {},
});

export default ThemeWrapperContext;
