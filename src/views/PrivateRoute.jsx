import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthProvider";
import { Route, Redirect } from "react-router-dom";
import { P } from "../components/UI";

/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const [authState] = useContext(AuthContext);

  return (
    <>
      {authState.isAuthenticating ? (
        <P>
          Oops something went wrong. Check that email and passoword are correct
          and try again
        </P>
      ) : (
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
      )}
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
