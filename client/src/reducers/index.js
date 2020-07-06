import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import postReducer from "./post";
import commentReducer from "./comment";

const persistConfig = {
  key: "root", // from root
  storage,
  whitelist: ["user"], // which reducer to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
});

export default persistReducer(persistConfig, rootReducer);
