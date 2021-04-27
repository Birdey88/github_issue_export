import React from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

console.log(window.location);
export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" style={{ marginBottom: 10 }}>
      <Navbar.Brand as={Link} to="/">
        GitHub Export Utility
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink as={Link} active={window.location.pathname === "/Repos"} to="/Repos">
            Repos
          </NavLink>
          <NavLink as={Link} active={window.location.pathname === "/Auth"} to="/Auth">
            Auth Details
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
