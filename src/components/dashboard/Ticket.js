import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from "reactstrap";
import "./Dashboard.css";
import { initialState } from "../reducer/reducer";
import { axiosAuth } from "../utils/axiosAuth";

const Ticket = (props) => {
  const { ticket } = props;
  const { ticket_id, status } = ticket;
  const [resolved, setResolved] = useState(status === "RESOLVED");

  const handleResolve = () => {
    axiosAuth()
      .patch(`/api/tickets/${ticket_id}/resolve`)
      .then((res) => setResolved(true));
  };

  return (
    <Card className="card">
      <CardBody>
        <div className="ticket">
          <CardSubtitle>Ticket #: {ticket.ticket_id}</CardSubtitle>
          <CardSubtitle className="ticket">
            Category:{" "}
            {ticket.categories?.map((cat) => (
              <span className="category">{cat}</span>
            ))}
          </CardSubtitle>
        </div>
        <CardTitle className="ticketTitle">Title: {ticket.title}</CardTitle>
        <CardText>Description: {ticket.description}</CardText>
        <CardText>What I've Tried: {ticket.what_ive_tried}</CardText>
        <Button
          onClick={() => console.log("hi")}
          style={{
            backgroundColor: "#0066cc",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Edit
        </Button>
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "red",
            cursor: "pointer",
          }}
        >
          Delete
        </Button>
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "green",
            cursor: "pointer",
          }}
          disabled={resolved}
          onClick={handleResolve}
        >
          {resolved ? "Resolved" : "Resolve"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default Ticket;
