import SearchSchemaContext from "./SearchSchemaContext";

const { createContext } = require("react");

const MediaContext = createContext({
  lastPosition: 0,
  setLastPosition: () => {},
  ...SearchSchemaContext,
});

export default MediaContext;
