import * as actionTypes from "./types";
import axiosConfig from "../../contexts/axiosConfig";
import * as authHelper from "../../helpers/authHelper";
import flattenParams from "../../helpers/flattenParams";

export const GetIssuesByRepoNameByPageNumber = (repo, page) => (dispatch) => {
  const org = authHelper.GetOrgFromStorage();
  dispatch({ type: actionTypes.ISSUES_MAKE_REQUEST });
  axiosConfig
    .get(`search/issues`, {
      params: {
        q: `repo:${org}/${repo}`,
        page: page,
      },
    })
    .then((res) => {
      dispatch({
        type: actionTypes.ISSUES_GET_DATA,
        payload: {
          issuesList: res.data.items,
          numOfPages:
            Math.ceil(res.data.total_count / 30) < 30 ? Math.ceil(res.data.total_count / 30) : 30,
          totalIssues: res.data.total_count,
        },
      });
    })
    .catch((e) => {
      dispatch({ type: actionTypes.ISSUES_ERROR, payload: { error: e } });
    });
};

export const FilterIssuesFromRepo = (repo, params, page) => (dispatch) => {
  const flatParams = flattenParams(params);
  const org = authHelper.GetOrgFromStorage();
  dispatch({ type: actionTypes.ISSUES_MAKE_REQUEST });
  axiosConfig
    .get(`search/issues`, {
      params: {
        q: `repo:${org}/${repo} ${flatParams ? flatParams : ""}`,
        page: page,
      },
    })
    .then((res) => {
      console.info(res);
      dispatch({
        type: actionTypes.ISSUES_GET_DATA,
        payload: {
          issuesList: res.data.items,
          totalIssues: res.data.total_count,
          numOfPages:
            Math.ceil(res.data.total_count / 30) < 30 ? Math.ceil(res.data.total_count / 30) : 30,
        },
      });
    })
    .catch((e) => {
      dispatch({ type: actionTypes.ISSUES_ERROR, payload: { error: e } });
    });
};

export const GetAllIssuesFromRepo = (repo, params, numOfPages) => (dispatch) => {
  const flatParams = flattenParams(params);
  const org = authHelper.GetOrgFromStorage();

  let allIssues = [];
  const calls = [];

  dispatch({ type: actionTypes.ISSUES_MAKE_REQUEST });

  for (let i = 1; i < numOfPages + 1; i++) {
    calls.push(
      axiosConfig
        .get(`search/issues`, {
          params: {
            q: `repo:${org}/${repo} ${flatParams ? flatParams : ""}`,
            page: i,
          },
        })
        .then((res) => {
          allIssues.push(res.data.items);
        })
        .catch((e) => {
          dispatch({ type: actionTypes.ISSUES_ERROR, payload: { error: e } });
        })
    );
  }
  Promise.all(calls).then(() => {
    dispatch({
      type: actionTypes.ISSUES_GET_ALL_DATA,
      payload: {
        issuesList: allIssues.flat(1),
        totalIssues: allIssues.flat(1).length,
      },
    });
  });
};
