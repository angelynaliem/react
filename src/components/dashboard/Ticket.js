import React, { useState } from "react";
import {
  Card,
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


const Ticket = (props, {tickets, setNewTickets}) => {

  const { ticket } = props;
  const { ticket_id, status } = ticket;
  const [resolved, setResolved] = useState(status === "RESOLVED");
  const [claim, setClaim] = useState(status === "CLAIMED");
  
  const [editing, setEditing] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState(initialState);
  
    const editTicket = ticket => {
      setEditing(true);
      setTicketToEdit(ticket);
    };
  
    const saveEdit = e => {
      e.preventDefault();
      axiosAuth()
      .put(`/api/tickets/${ticket_id}`, ticketToEdit)
      .then(res => {
        console.log(res.data)
        window.location.reload()
        setNewTickets(true);
      })
      .catch(err =>
        console.log(err))
    }

  const handleResolve = () => {
    axiosAuth()
      .patch(`/api/tickets/${ticket_id}/resolve`)
      .then((res) => setResolved(true));
  };

  const handleClaim = () => {
    axiosAuth()
    .patch(`/api/tickets/${ticket_id}/claim`)
    .then((res) => setClaim(true));
  }

  const deleteTicket = ticket => {
    axiosAuth()
    .delete(`/api/tickets/${ticket_id}`, ticket)
    .then(res => {
      console.log(res.data)
      window.location.reload()
    })
  };

  return (
    <div>
    <>
    <Card className="card">
      <CardBody>
        <div className="ticket">
          <CardSubtitle>Ticket #: {ticket.ticket_id}</CardSubtitle>
          <CardSubtitle className="ticket">
            Category:{" "}
            {ticket.categories.map((cat) => (
              <span className="category">{cat}</span>
            ))}
          </CardSubtitle>
        </div>
        <CardTitle className="ticketTitle">Title: {ticket.title}</CardTitle>
        <CardText>Description: {ticket.description}</CardText>
        <CardText>What I've Tried: {ticket.what_ive_tried}</CardText>
        
        {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Ticket</legend>
          <label>
            Title:
            <input
              onChange={e =>
                setTicketToEdit({ ...ticketToEdit, 
                title: e.target.value })
              }
              value={ticketToEdit.title}
            />
          </label>
          <label>
            Description:
            <input
              onChange={e =>
                setTicketToEdit({
                  ...ticketToEdit,
                  description: e.target.value })
              }
              value={ticketToEdit.description}
            />
          </label>
          <label>
            What I've Tried:
            <input
              onChange={e =>
                setTicketToEdit({
                  ...ticketToEdit,
                  what_ive_tried: e.target.value })
              }
              value={ticketToEdit.what_ive_tried}
            />
          </label>
          <label>
            Category:
            <Label htmlFor="category" className="dropDownNewTicket">
            <h4>Pick a category</h4>
            <select id="category" name="category" type="text" value={ticketToEdit.categories} onChange={e =>
                setTicketToEdit({
                  ...ticketToEdit,
                  categories: [e.target.value] })
              }>
              <option value="React">React</option>
              <option value="Back End">Back End</option>
              <option value="SASS">SASS</option>
              <option value="Animation">Animation</option>
            </select>
          </Label>
          </label>
          <Button
            type="submit"
            style={{
              marginRight: "10px",
              backgroundColor: "purple",
              cursor: "pointer",
            }}
            >Save
          </Button>
        </form>
      )}
      <Button
          style={{
            marginRight: "10px",
            backgroundColor: "green",
            cursor: "pointer",
          }}
          disabled={claim}
          onClick={handleClaim}
        >
          {claim ? "Claimed" : "Help Student"}
        </Button>
      <Button 
        onClick={() => setEditing(true)}
        style={{
          backgroundColor: "#0066cc",
          marginRight: "10px",
          cursor: "pointer",
        }}
        >Edit
      </Button>
      <Button
        onClick={e => {
          e.preventDefault();
          deleteTicket(ticket)            
          }}
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
      </>
      </div>
    );
  };

export default Ticket;