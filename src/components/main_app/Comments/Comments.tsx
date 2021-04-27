import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import * as commentsActions from "../../../store/actions/commentsActions";

export default function Comments({ repoName, issueNumber }) {
  const comments = useSelector((state) => state.comments.commentsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsActions.GetCommentsByIssueNumber(repoName, issueNumber));
  }, [repoName, issueNumber, dispatch]);

  return (
    <>
      <h6>Comments:</h6>
      <ListGroup>
        {comments &&
          comments.get(issueNumber)?.map((commentData) => {
            return (
              <ListGroup.Item key={commentData.id}>
                <Row>
                  <Col xs={1}>
                    <img
                      src={commentData.user?.avatar_url}
                      alt=""
                      style={{ width: 40, height: 40 }}
                    />
                  </Col>
                  <Col>
                    <strong>{commentData.user?.login}</strong>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>{commentData?.body}</Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}
