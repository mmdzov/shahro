import SearchSchemaContext from "./SearchSchemaContext";

const { createContext } = require("react");

const StoreContext = createContext({
  ...SearchSchemaContext,
});

export default StoreContext;
