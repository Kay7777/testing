import { PostsActionTypes } from "../actions/types";

const INITIAL_STATE = {
  allPosts: [],
  userPosts: [],
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostsActionTypes.SET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
