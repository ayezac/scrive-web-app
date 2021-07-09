import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../constants";

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-family: "poppins";
  text-align: ${({ textAlign }) => textAlign || "left"};
  font-size: ${({ fontSize }) => theme.spacing[fontSize] || theme.spacing[4]};
  color: ${({ color }) => theme.colors[color] || theme.colors.primary};
`;
