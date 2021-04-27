import React from "react";
import { Form, Col, Row, ToggleButton, ToggleButtonGroup, Button, Card } from "react-bootstrap";
import MilestoneDropdown from "./Milestones/MilestoneDropdown";

export default function SearchForm({
  handleMilestoneChange,
  handleTitleChange,
  handleStateChange,
  handleAllIssuesButton,
  toggleAllIssues,
  milestoneTitle,
  issues,
}) {
  const buttons = [
    { name: "All", value: "all" },
    { name: "Open", value: "open" },
    { name: "Closed", value: "closed" },
  ];

  return (
    <Form className="mb-4 w-100">
      <Card>
        <Card.Body>
          <Card.Title>Search</Card.Title>
          <Row>
            <Col xs={5}>
              <Form.Control
                onChange={handleTitleChange}
                type="text"
                name="title"
                placeholder="Title"
              />
            </Col>
            <Col className="text-center">
              <MilestoneDropdown
                handleMilestoneChange={handleMilestoneChange}
                issues={issues}
                milestoneTitle={milestoneTitle}
              />
            </Col>
            <Col className="text-center">
              <ToggleButtonGroup type="radio" defaultValue="all" name="state">
                {buttons.map((button, idx) => (
                  <ToggleButton
                    key={idx}
                    value={button.value}
                    onChange={(e) => handleStateChange(e.currentTarget.value)}
                    variant="success"
                  >
                    {button.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Col>
            <Col>
              <Button className={"ml-2 mb-2"} onClick={handleAllIssuesButton} variant="success">
                {toggleAllIssues ? "Hide" : "Show"} All Issues
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
}
