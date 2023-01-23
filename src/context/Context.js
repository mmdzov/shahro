const { createContext } = require("react");

const Context = createContext({
  homeMediaImageSize: [],
  setHomeMediaImageSize: () => {},
});

export default Context;
