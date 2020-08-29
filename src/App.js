import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import NewTicketForm from "./components/dashboard/NewTicketForm";
import PrivateRoute from "./components/utils/PrivateRoute";

import { connect } from "react-redux";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/new_ticket_form"
            component={NewTicketForm}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
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
