import { createSelector } from "reselect";

const selectPost = (state) => state.comment;

export const selectCurrentComments = createSelector(
  [selectPost],
  (comment) => comment.currentComments
);
