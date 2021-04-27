import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import BackButton from "../backButton";

import CenteredContainer from "../CenteredContainer";
import ExportSimple from "./ExportSimple";

export default function Export() {
  const { repoName } = useParams();

  const issuesList = useSelector((state) => state.issues.issuesList);

  const [formData, setformData] = useState({
    number: true,
    title: true,
    state: false,
    milestone: false,
    createdDate: false,
  });
  const [showExport, setshowExport] = useState(true);
  const [showExportSimple, setshowExportSimple] = useState(false);

  const handleSubmit = (e) => {
    setshowExport(false);
    setshowExportSimple(true);
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    setformData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <div>
      <CenteredContainer>
        {showExport && (
          <>
            <Form>
              <h1>{`Export - ${repoName} (Issues for export: ${issuesList.length})`}</h1>
              <h3>Tick to enable in the export:</h3>
              <Form.Group as={Row}>
                <Form.Check
                  type="checkbox"
                  label="Number"
                  name="number"
                  checked={formData.number}
                  style={{ marginLeft: "10px" }}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Title"
                  name="title"
                  checked={formData.title}
                  style={{ marginLeft: "10px" }}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="State"
                  name="state"
                  checked={formData.state}
                  style={{ marginLeft: "10px" }}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Milestone"
                  name="milestone"
                  checked={formData.milestone}
                  style={{ marginLeft: "10px" }}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Created Date"
                  name="createdDate"
                  checked={formData.createdDate}
                  style={{ marginLeft: "10px" }}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
              <BackButton />
              <Button variant="primary" type="button" onClick={handleSubmit} className="ml-2 mb-2">
                Export
              </Button>
            </Form>
          </>
        )}
        {showExportSimple && (
          <>
            <Button
              variant="primary"
              type="button"
              style={{ margin: "10px" }}
              onClick={() => {
                setshowExport(true);
                setshowExportSimple(false);
              }}
            >
              Back
            </Button>
            <ExportSimple formData={formData} />
          </>
        )}
      </CenteredContainer>
    </div>
  );
}
