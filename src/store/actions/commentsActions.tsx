import * as actionTypes from "./types";
import axiosConfig from "../../contexts/axiosConfig";
import * as authHelper from "../../helpers/authHelper";

export const GetCommentsByIssueNumber = (repoName, issueNumber) => (dispatch) => {
  const org = authHelper.GetOrgFromStorage();
  dispatch({ type: actionTypes.COMMENTS_MAKE_REQUEST });
  axiosConfig
    .get(`repos/${org}/${repoName}/issues/${issueNumber}/comments`)
    .then((res) => {
      dispatch({
        type: actionTypes.COMMENTS_GET_DATA,
        payload: { issueNumber: issueNumber, commentData: res.data },
      });
    })
    .catch((e) => {
      dispatch({ type: actionTypes.COMMENTS_ERROR, payload: { error: e } });
    });
};
