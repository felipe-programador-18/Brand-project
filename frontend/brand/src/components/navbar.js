import React from 'react' 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {NavLink} from 'react-router-dom'


const NavOtherBar = () => {

    return (
  <Navbar bg="light mx-4 "  expand="lg">
   
      <Navbar.Brand href="#home">Brand-Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link href='#home' >Home</Nav.Link>
          <Nav.Link href="/login" >Sing-in</Nav.Link>
         
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about" >About</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Github
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Linkedin</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
   
  </Navbar> )



}

export default NavOtherBar