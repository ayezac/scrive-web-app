import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../constants";
import { AuthContext } from "../AuthProvider";
import { Box, Button, StyledLink } from "./UI";
import { cookieAuthKey } from "../utils/api";
import Cookies from "js-cookie";

const SidebarContainer = styled.div`
  height: 100%;
  width: 180px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${theme.colors.primary};
  overflow-x: hidden;
  padding: 20px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;
const Sidebar = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const logout = () => {
    Cookies.remove(cookieAuthKey);
    setAuthState({
      ...authState,
      isAuthenticated: false,
    });
    window.location.reload();
  };
  return (
    <SidebarContainer>
      <Box>
        <StyledLink to="/app" color="white">
          All Documents
        </StyledLink>
      </Box>
      <Box>
        <StyledLink to="/app/drafts" color="white">
          Drafts
        </StyledLink>
      </Box>
      <Box>
        <StyledLink to="/app/signed" color="white">
          Signed
        </StyledLink>
      </Box>
      <Box>
        <StyledLink to="/app/trash" color="white">
          Trash
        </StyledLink>
      </Box>
      <Button onClick={logout} m="2" p="2">
        Logout
      </Button>
    </SidebarContainer>
  );
};

export default Sidebar;
