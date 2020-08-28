import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "./StudentDashboard.css";
import Search from './Search';

const StudentNav = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const search = () => {
      return (
        <Search />
      )
    }

    return(

        <div>
        <Navbar color="faded" light className="mainNavDiv">
          <NavbarBrand href="https://reachoutdevdesk.netlify.app/" className="mr-auto" classID="logo"  style={{ fontFamily: "Roboto Mono , serif", fontSize: "2rem", fontWeight: "bolder", color: "#74CBC1" }}>Dev Desk</NavbarBrand>
          <div className="subNavDiv">
          <i className="fa fa-search" style={{color: "#74CBC1", marginRight: "5%"}} ></i>
        <Search />

          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/new_ticket_form/">Create a new ticket</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/student_dashboard">Go to Student Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/helper_dashboard">Go to Helper Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Log Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    );
        
}
export default StudentNav