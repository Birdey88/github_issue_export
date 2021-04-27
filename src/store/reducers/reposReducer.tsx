import * as actionTypes from "../actions/types";

export default function reposReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.REPO_MAKE_REQUEST:
      return { ...state, loading: true, reposList: [] };
    case actionTypes.REPO_GET_DATA:
      return { ...state, loading: false, reposList: action.payload.reposList };
    case actionTypes.REPO_ERROR:
      return { ...state, loading: false, error: action.payload.error, reposList: [] };
    default:
      return state;
  }
}
