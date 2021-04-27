import { combineReducers } from "redux";
import commentsReducer from "./commentsReducer";
import issuesReducer from "./issuesReducer";
import reposReducer from "./reposReducer";

export default combineReducers({
  issues: issuesReducer,
  repos: reposReducer,
  comments: commentsReducer,
});
