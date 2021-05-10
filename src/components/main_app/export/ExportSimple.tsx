import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import dynamicSort from "../../../helpers/sortFunctions";

export default function ExportSimple({ formData }) {
  const issuesList = useSelector((state) => state.issues.issuesList);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {formData.number && <th>GitHub Issue Number</th>}
            {formData.title && <th>Title</th>}
            {formData.state && <th>State</th>}
            {formData.milestone && <th>Milestone</th>}
            {formData.createdDate && <th>Created Date</th>}
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {issuesList &&
            issuesList.sort(dynamicSort("-number")).map((issue) => {
              return (
                <tr key={issue.id}>
                  {formData.number && <td>#{issue.number}</td>}
                  {formData.title && <td>{issue.title}</td>}
                  {formData.state && <td>{issue.state}</td>}
                  {formData.milestone && <td>{issue.milestone && issue.milestone.title}</td>}
                  {formData.createdDate && (
                    <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                  )}
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
