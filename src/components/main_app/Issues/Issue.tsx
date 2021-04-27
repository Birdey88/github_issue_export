import React, { useState } from "react";
import { Card, Button, Collapse, ListGroup } from "react-bootstrap";
import Markdown from "react-markdown";

import Labels from "./Labels";
import Assignees from "./Assignees";
import titleCase from "../../../helpers/titleCase";
import Comments from "../Comments/Comments";
import { useSelector } from "react-redux";

export default function Issue({ issue, repoName }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex">
          <div>
            <Card.Title>
              <a href={issue.html_url && issue.html_url}>
                #{issue.number} - {issue.title}
              </a>
            </Card.Title>
            <Card.Subtitle>
              <div style={{ display: "grid", gridAutoFlow: "column" }}>
                <Labels labels={issue.labels} />
              </div>
            </Card.Subtitle>
            <Card.Subtitle className="text-dark mb-2">
              <p>{titleCase(issue.state)}</p>
              {issue.milestone && <h6>Milestone: {issue.milestone.title}</h6>}
              {issue.assignees && <Assignees assignees={issue.assignees}></Assignees>}
            </Card.Subtitle>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(issue.created_at).toLocaleDateString()}
            </Card.Subtitle>
          </div>
        </div>
        <Card.Text>
          {issue.body ? (
            <Button
              onClick={() => setShowDetails((prevOpen) => !prevOpen)}
              variant={showDetails ? "secondary" : "primary"}
              className="mr-2"
            >
              {showDetails ? "Hide Details" : "View Details"}
            </Button>
          ) : (
            <div>No details for this issue</div>
          )}
          {issue.comments ? (
            <Button
              onClick={() => setShowComments((prevOpen) => !prevOpen)}
              variant={showComments ? "secondary" : "primary"}
              className="mr-2"
            >
              {showComments ? "Hide Comments" : "View Comments"}
            </Button>
          ) : (
            <div>No comments for this issue</div>
          )}
        </Card.Text>
        <Collapse in={showDetails}>
          <div>
            <h6>Details:</h6>
            {issue.body && <Markdown children={issue.body} className="mt-4 overflow-hidden" />}
          </div>
        </Collapse>
        <Collapse in={showComments}>
          <ListGroup>
            {loading && <h4>Loading...</h4>}
            {error && <h4>Error. Try Refreshing. {error.message}</h4>}
            {showComments && <Comments issueNumber={issue.number} repoName={repoName} />}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
