import { UserActionTypes } from "./types";
import axios from "axios";

// User Actions
export const UserLogOut = (cb) => async (dispatch) => {
  const res = await axios.post("/auth/logout");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: null });
  cb(res);
};

export const UserSignIn = (props, cb) => async (dispatch) => {
  const res = await axios.post("/api/user/signin", props);
  const doc = await axios.get("/auth/current_user");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: doc.data });
  cb(res);
};

export const GoogleSignIn = () => async (dispatch) => {
  console.log("google sign in");
  const doc = await axios.get("/auth/current_user");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: doc.data });
};
