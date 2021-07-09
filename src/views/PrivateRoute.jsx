import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthProvider";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const [authState] = useContext(AuthContext);

  return (
    <>
      <Route
        {...props}
        render={(innerProps) => {
          return authState.isAuthenticated ? (
            <RouteComponent {...innerProps} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }}
      />
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
