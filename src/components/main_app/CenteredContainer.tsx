import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "./Navbar";

export default function CenteredContainer({ children }) {
  return (
    <>
      <NavigationBar />
      <Container className="w-screen">
        <div className="w-100">{children}</div>
      </Container>
    </>
  );
}
