import SearchSchemaContext from "./SearchSchemaContext";

const { createContext } = require("react");

const FareContext = createContext({
  ...SearchSchemaContext,
  lastPosition: 0,
  setLastPosition: () => {},
});

export default FareContext;
