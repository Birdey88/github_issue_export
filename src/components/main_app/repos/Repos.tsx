import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import * as reposActions from "../../../store/actions/reposActions";
import CenteredContainer from "../CenteredContainer";

export default function Repos() {
  const repos = useSelector((state) => state.repos.reposList);
  const loading = useSelector((state) => state.repos.loading);
  const error = useSelector((state) => state.repos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reposActions.GetAllRepos());
  }, [dispatch]);
  return (
    <CenteredContainer>
      <h1>Repos</h1>
      <img src={repos && repos[0]?.owner.avatar_url} alt={""} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing. {error.message}</h1>}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {repos ? (
            repos
              .sort((a, b) => b.open_issues - a.open_issues)
              .map((repo) => {
                return (
                  <Card key={repo.id} style={{ width: "18rem" }}>
                    <Card.Header>{<strong>{repo.name}</strong>}</Card.Header>
                    <Card.Body>
                      <p>{repo.description && repo.description}</p>
                      <p>{`Open Issues: ${repo.open_issues}`}</p>
                      <p>
                        <Link to={`/issues/${repo.id}/${repo.name}`}>See Issues</Link>
                      </p>
                    </Card.Body>
                  </Card>
                );
              })
          ) : (
            <div></div>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </CenteredContainer>
  );
}
