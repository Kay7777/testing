import {
  UserActionTypes,
  PostsActionTypes,
  CommentsActionTypes,
} from "./types";
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

export const UserSignUp = (props, cb) => async (dispatch) => {
  const res = await axios.post("/api/user/signup", props);
  cb(res);
};

export const GoogleSignIn = () => async (dispatch) => {
  console.log("google sign in");
  const doc = await axios.get("/auth/current_user");
  dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: doc.data });
};

// POSTS Actions

export const SetAllPosts = () => async (dispatch) => {
  const doc = await axios.get("/api/post/all");
  dispatch({ type: PostsActionTypes.SET_ALL_POSTS, payload: doc.data });
};

export const SetUserPosts = () => async (dispatch) => {
  const doc = await axios.get("/api/post/user");
  dispatch({ type: PostsActionTypes.SET_USER_POSTS, payload: doc.data });
};

export const CreateNewPost = (props, cb) => async (dispatch) => {
  await axios.post("/api/post/create", props);
  cb();
};

export const SetCurrentPost = (id) => async (dispatch) => {
  const doc = await axios.get("/api/post/" + id);
  dispatch({ type: PostsActionTypes.SET_CURRENT_POST, payload: doc.data });
};

export const DeleteUserPost = (id, cb) => async (dispatch) => {
  await axios.delete("/api/post/" + id);
  cb();
};

// COMMENTS Actions

export const SetCurrentComments = (id) => async (dispatch) => {
  const doc = await axios.get("/api/comment/" + id);
  dispatch({
    type: CommentsActionTypes.SET_CURRENT_COMMENTS,
    payload: doc.data,
  });
};

export const CreateNewComment = (id, props, cb) => async (dispatch) => {
  const res = await axios.post("/api/comment/" + id, props);
  cb(res);
};
