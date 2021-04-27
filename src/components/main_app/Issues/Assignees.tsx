import React from "react";
import Assignee from "./Assignee";

export default function Assignees({ assignees }) {
  return assignees.map((assignee) => (
    <div key={assignee.id}>
      <Assignee login={assignee.login} />
    </div>
  ));
}
