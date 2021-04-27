import * as actionTypes from "../actions/types";
import update from "immutability-helper";

export default function commentsReducer(state = { commentsList: new Map() }, action) {
  switch (action.type) {
    case actionTypes.COMMENTS_MAKE_REQUEST:
      return update(state, {
        loading: { $set: true },
      });
    case actionTypes.COMMENTS_GET_DATA:
      let newCommentsList = new Map(state.commentsList);
      newCommentsList.set(action.payload.issueNumber, action.payload.commentData);
      return {
        ...state,
        loading: false,
        commentsList: newCommentsList,
      };
    case actionTypes.COMMENTS_ERROR:
      return update(state, {
        loading: { $set: false },
        error: { $set: action.payload.error },
      });
    default:
      return state;
  }
}
