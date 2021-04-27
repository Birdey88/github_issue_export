import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function MilestoneDropdown({ issues, handleMilestoneChange, milestoneTitle }) {
  const milestones = GetMilestonesFromIssues(issues);
  return (
    <DropdownButton title={milestoneTitle} variant="success">
      {milestones &&
        milestones.map((milestone) => {
          return (
            <Dropdown.Item key={milestone} eventKey={milestone} onSelect={handleMilestoneChange}>
              {milestone}
            </Dropdown.Item>
          );
        })}
    </DropdownButton>
  );
}

function GetMilestonesFromIssues(issues) {
  if (!issues) return;
  let milestones = [
    ...new Set(issues.map((issue) => (issue.milestone ? issue.milestone.title : ""))),
  ];
  milestones.push("All Milestones");
  return milestones;
}
