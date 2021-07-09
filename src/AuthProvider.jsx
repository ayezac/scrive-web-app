import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { cookieAuthKey } from "./utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userLoggedIn = Cookies.get(cookieAuthKey);
  const [authState, setAuthState] = useState({
    isAuthenticated: userLoggedIn ? true : false,
    authenticationFailed: false,
  });

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
