import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "../AuthProvider";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import App from "./App";

const Root = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <PrivateRoute path="/app" component={App} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/app" />
      </Switch>
    </Router>
  </AuthProvider>
);

export default Root;
