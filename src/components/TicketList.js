import React, { useEffect } from "react";
import Ticket from "./students/Ticket";
import { connect } from "react-redux";
import { getTicketData } from "./actions/actions";

const TicketList = (props) => {
  useEffect(() => {
    props.getTicketData();
  }, []);

  return (
    <>
      {props.tickets.map((ticket) => {
        return <Ticket key={ticket.ticket_id} tickets={ticket} />;
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getTicketData })(TicketList);
