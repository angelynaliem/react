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
import "./StudentDashboard.css";
import { initialState } from "../reducer/reducer";
import { axiosAuth } from "../utils/axiosAuth";

const Ticket = (props) => {
  useEffect(() => {
    console.log(props.tickets);
  }, []);

  return (
    <Card className="card">
      <CardBody>
        <CardSubtitle>Ticket #: {props.tickets.ticket_id}</CardSubtitle>
        <CardSubtitle className="ticket">
          Category:{" "}
          {props.tickets.categories?.map((cat) => (
            <span className="category">{cat}</span>
          ))}
        </CardSubtitle>
        <CardTitle className="ticketTitle">
          Title: {props.tickets.title}
        </CardTitle>
        <CardText>Description: {props.tickets.description}</CardText>
        <CardText>What I've Tried: {props.tickets.what_ive_tried}</CardText>
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
        >
          Resolve
        </Button>
      </CardBody>
    </Card>
  );
};

export default Ticket;
