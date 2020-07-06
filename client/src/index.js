import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const middlewares = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
