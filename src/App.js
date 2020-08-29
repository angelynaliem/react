import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/students/StudentDashboard";
import NewTicketForm from "./components/students/NewTicketForm";

import { connect } from "react-redux";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/new_ticket_form" component={NewTicketForm} />
          <Route exact path="/dashboard" component={StudentDashboard} />
          <Route path="/dashboard/:id">
            <StudentDashboard />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const mapsStateToProps = (state) => {
  return {
    tickets: state.tickets,
  };
};

export default connect(mapsStateToProps, {})(App);
