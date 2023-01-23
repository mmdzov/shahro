import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { setDevice } from "./actions/_MainAction";
import storage from "redux-persist/es/storage";
import { persistStore, persistReducer } from "redux-persist";

const middleware = [thunk];
const persistConf = {
  key: "root",
  storage,
  whitelist: ["path"],
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistReducer(persistConf, rootReducer),
  composeEnhancers(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
store.dispatch(setDevice());

export { store, persistor };
