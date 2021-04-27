import * as actionTypes from "../actions/types";

export default function issuesReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.ISSUES_MAKE_REQUEST:
      return { ...state, loading: true, issuesList: [] };
    case actionTypes.ISSUES_GET_DATA:
      return {
        ...state,
        loading: false,
        error: "",
        issuesList: action.payload.issuesList,
        numOfPages: action.payload.numOfPages,
        totalIssues: action.payload.totalIssues,
      };
    case actionTypes.ISSUES_GET_ALL_DATA:
      return {
        ...state,
        loading: false,
        error: "",
        issuesList: action.payload.issuesList,
        numOfPages: 1,
        totalIssues: action.payload.totalIssues,
      };
    case actionTypes.ISSUES_ERROR:
      return { ...state, loading: false, error: action.payload.error, issuesList: [] };
    default:
      return state;
  }
}
