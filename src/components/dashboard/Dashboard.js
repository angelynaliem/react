import React from "react";
import TicketList from "../TicketList";
import "./Dashboard.css";
import Nav from "./Nav";

const StudentDashboard = () => {
  return (
    <div>
      <Nav />

      <h2 style={{ fontFamily: "Roboto Mono , serif" }}>My Tickets</h2>

      <div className="ticketBar">
        <h3 style={{ fontFamily: "Roboto Mono , serif" }}>Open Tickets</h3>
        <h3 style={{ fontFamily: "Roboto Mono , serif" }}>Resolved Tickets</h3>
      </div>

      <TicketList />
    </div>
  );
};

export default StudentDashboard;
