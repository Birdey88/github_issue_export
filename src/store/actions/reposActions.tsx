import * as actionTypes from "./types";
import axiosConfig from "../../contexts/axiosConfig";
import * as authHelper from "../../helpers/authHelper";

export const GetAllRepos = () => (dispatch) => {
  const org = authHelper.GetOrgFromStorage();
  dispatch({ type: actionTypes.REPO_MAKE_REQUEST });
  axiosConfig
    .get(`orgs/${org}/repos`)
    .then((res) => {
      dispatch({ type: actionTypes.REPO_GET_DATA, payload: { reposList: res.data } });
    })
    .catch((e) => {
      dispatch({ type: actionTypes.REPO_ERROR, payload: { error: e } });
    });
};
