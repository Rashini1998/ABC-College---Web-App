import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../Images/Logo.png";
import { Link } from "react-router-dom";
import "../CSS/NavigationBar.css";

const NavigationBar = () => {
  return (
    <Navbar variant="dark" fixed="top" className="navStyle">
      <Navbar.Brand as={Link} to="/home" className="navLogo">
        <img
          src={Logo}
          alt="Logo"
          height="30px"
          className="d-inline-block align-top mr-2"
        />
        ABC College
      </Navbar.Brand>
      <Nav className="ml-auto navbarLink">
        <Nav.Link as={Link} to="/home" className="navLinks">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/addStudent" className="navLinks">
          Add Students
        </Nav.Link>
        <Nav.Link as={Link} to="/students" className="navLinks">
          View Students
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
