import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Issue from "./Issue";
import * as issuesActions from "../../../store/actions/issuesActions";
import CenteredContainer from "../CenteredContainer";
import SearchForm from "./SearchForm";
import { Button, Col, Container, Row } from "react-bootstrap";
import BackButton from "../backButton";
import AppPagination from "../AppPagination";

export default function Issues() {
  const history = useHistory();
  const issues = useSelector((state) => state.issues.issuesList);
  const totalIssues = useSelector((state) => state.issues.totalIssues);
  const loading = useSelector((state) => state.issues.loading);
  const error = useSelector((state) => state.issues.error);
  const numOfPages = useSelector((state) => state.issues.numOfPages);
  const [displayAllIssues, setDisplayAllIssues] = useState(false);
  const [searchData, setsearchData] = useState();
  const [page, setPage] = useState(1);
  const [milestoneTitle, setmilestoneTitle] = useState("Milestones");

  const dispatch = useDispatch();

  const { id } = useParams();
  const { repoName } = useParams();

  let timerId: number;

  const handleTitleChange = (e: { target: { value: any; }; }) => {
    clearTimeout(timerId);
    const value = e.target.value;
    const name = "title";
    timerId = setTimeout(() => {
      setsearchData((prevData) => ({ ...prevData, [name]: value }));
    }, 900);
  };

  const handleMilestoneChange = (e: React.SetStateAction<string>) => {
    clearTimeout(timerId);
    setDisplayAllIssues(false);
    if (e === "All Milestones") {
      e = "";
      setmilestoneTitle("Milestones");
    } else setmilestoneTitle(e);
    const value = `milestone:${e}`;
    let name = "milestone";
    timerId = setTimeout(() => {
      setsearchData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }, 900);
  };

  const handleStateChange = (stateValue: string) => {
    setDisplayAllIssues(false);
    if (stateValue) {
      let value = `state:${stateValue.toLowerCase()}`;
      if (stateValue === "all") value = ""; // otherwise GitHub returns no results
      const name = "state";
      setsearchData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };

  const handleAllIssuesButton = () => {
    setsearchData("");
    dispatch(issuesActions.GetAllIssuesFromRepo(repoName, searchData, numOfPages));
    setDisplayAllIssues(!displayAllIssues);
  };

  const handleAllIssuesExportButton = () => {
    if (!displayAllIssues)
      dispatch(issuesActions.GetAllIssuesFromRepo(repoName, searchData, numOfPages));
    history.push(`/Export/${id}/${repoName}`);
  };

  useEffect(() => {
    dispatch(issuesActions.FilterIssuesFromRepo(repoName, searchData, page));
  }, [searchData, dispatch, repoName, page]);

  useEffect(() => {
    dispatch(issuesActions.GetIssuesByRepoNameByPageNumber(repoName, page));
  }, [dispatch, repoName, page]);
  return (
    <CenteredContainer>
      <Container>
        <Row>
          <h1>{`Issues for ${repoName}`}</h1>
        </Row>
        <Row>
          <BackButton />
        </Row>
        <Row>
          <SearchForm
            handleMilestoneChange={handleMilestoneChange}
            handleTitleChange={handleTitleChange}
            handleStateChange={handleStateChange}
            handleAllIssuesButton={handleAllIssuesButton}
            displayAllIssues={displayAllIssues}
            milestoneTitle={milestoneTitle}
            issues={issues}
          />
        </Row>
        <Row>
          <Col>
            {numOfPages > 1 && (
              <AppPagination page={page} setPage={setPage} numOfPages={numOfPages} />
            )}
          </Col>
          <Col className="text-right">
            <Link to={`/export/${id}/${repoName}`}>
              <Button className={"ml-3 mb-2"}>
                Export {issues && issues.length} issues on this page
              </Button>
            </Link>
            {totalIssues !== issues && issues.length > 0 ? (
              <Button className={"ml-2 mb-2"} onClick={handleAllIssuesExportButton}>
                Export all {totalIssues} Issues
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error. Try Refreshing. {error.message}</h1>}
        </Row>
        <Row xs={1}>
          {issues &&
            issues.map((issue) => {
              return (
                <Col key={issue.id}>
                  <Issue key={issue.id} issue={issue} repoName={repoName} />
                </Col>
              );
            })}
        </Row>
        <Row style={{ display: "flex", alignItems: "right" }}>
          <Col>
            {numOfPages > 1 && (
              <AppPagination page={page} setPage={setPage} numOfPages={numOfPages} />
            )}
          </Col>
          <Col className="text-right">
            Number of issues in search: {totalIssues}
            {numOfPages > 1 && <div>Pages: {numOfPages}</div>}
          </Col>
        </Row>
      </Container>
    </CenteredContainer>
  );
}
