import React from "react";
import TicketList from "../TicketList";
import "./Dashboard.css";
import Nav from "./Nav";
import { Container } from "reactstrap";

const StudentDashboard = () => {
  return (
    <div>
      <Nav />

      <h2 style={{ fontFamily: "Roboto Mono , serif" }}>My Tickets</h2>

      <Container className="ticketContainer">
      <div className="openTicket">
        <h3 style={{ fontFamily: "Roboto Mono , serif" }}>Open Tickets</h3>
        <TicketList />
      </div>
      <div className="resolvedTicket">
        <h3 style={{ fontFamily: "Roboto Mono , serif" }}>Resolved Tickets</h3>
      </div>
      </Container>
    </div>
  );
};

export default StudentDashboard;
