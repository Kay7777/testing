import { CommentsActionTypes } from "../actions/types";

const INITIAL_STATE = {
  currentComments: [],
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentsActionTypes.SET_CURRENT_COMMENTS:
      return {
        ...state,
        currentComments: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
