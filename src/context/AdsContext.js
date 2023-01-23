import SearchSchemaContext from "./SearchSchemaContext";

const { createContext } = require("react");

const AdsContext = createContext({
  ...SearchSchemaContext,
  lastPosition: 0,
  setLastPosition: () => {},
});

export default AdsContext;
