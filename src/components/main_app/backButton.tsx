import { Button } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router";

export default function BackButton() {
  const history = useHistory();
  return (
    <Button
      variant="dark"
      className={"mb-2 ml-3"}
      onClick={() => {
        history.goBack();
      }}
    >
      <span>Back</span>
    </Button>
  );
}
