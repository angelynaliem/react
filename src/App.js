import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import HelperDashboard from "./components/Helper/HelperDashboard";
import HelperTickets from "./components/Helper/HelperTickets";
import PrivateRoute from "./components/utils/PrivateRoute";
import StudentDashboard from "./components/students/StudentDashboard";
import NewTicketForm from "./components/students/NewTicketForm";

import { connect } from "react-redux";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/helper_dashboard" component={HelperDashboard} />
          {/* <PrivateRoute
            path="/student_dashboard"
            component={StudentDashboard}
          /> */}
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/helpertickets">
            <HelperTickets />
          </PrivateRoute>
          {/* <PrivateRoute
            exact
            path="/student_dashboard"
            component={StudentDashboard}
          /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/new_ticket_form" component={NewTicketForm} />
          <PrivateRoute exact path="/student_dashboard" component={StudentDashboard} />
          <PrivateRoute path="/student_dashboard/:id">
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
