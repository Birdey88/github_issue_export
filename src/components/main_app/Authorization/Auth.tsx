import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import CenteredContainer from "../CenteredContainer";

export default function Auth() {
  const [errors, setErrors] = useState();
  const OrgRef = useRef();
  const TokenRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    const orgFromLocalStorage = localStorage.getItem("org");
    if (tokenFromLocalStorage) TokenRef.current.value = tokenFromLocalStorage;
    if (orgFromLocalStorage) OrgRef.current.value = orgFromLocalStorage;
  }, []);

  const handleSubmit = () => {
    setErrors("");
    const org = OrgRef.current.value;
    const token = TokenRef.current.value;
    if (!org || !token) {
      setErrors("Sorry you need to enter the correct data");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("org", org);
    history.push("/");
  };

  const handleChange = (e) => {};

  return (
    <CenteredContainer>
      <h2>Please enter in your personal GitHub Token and Organisation here:</h2>
      <Form>
        <Form.Control
          style={{ marginTop: "10px", maxWidth: "50vw" }}
          placeholder="Github Token"
          onChange={handleChange}
          name="org"
          ref={TokenRef}
        />
        <Form.Control
          style={{ marginTop: "10px", maxWidth: "50vw" }}
          placeholder="Organisation as it appears in GitHub"
          onChange={handleChange}
          name="token"
          ref={OrgRef}
        />
        <Button style={{ marginTop: "10px" }} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      {errors && <h2 style={{ color: "red" }}>{errors}</h2>}
    </CenteredContainer>
  );
}
