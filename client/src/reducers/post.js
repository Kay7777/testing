import { PostsActionTypes } from "../actions/types";

const INITIAL_STATE = {
  allPosts: [],
  userPosts: [],
  currentPost: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    case PostsActionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case PostsActionTypes.SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
