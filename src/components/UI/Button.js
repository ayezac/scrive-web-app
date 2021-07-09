import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { theme } from "../../constants";

const buttonCss = css`
  font-family: "montserrat";
  width: ${({ width }) => theme.spacing[width] || "auto"};
  cursor: pointer;
  background-color: ${({ backgroundColor }) =>
    theme.colors[backgroundColor] || theme.colors.blue};
  color: ${({ color }) => theme.colors[color] || theme.colors.white};
  font-size: ${({ fontSize }) => theme.spacing[fontSize] || "1rem"};
  margin: ${({ m }) => theme.spacing[m] || theme.spacing[4]};
  padding: ${({ p }) =>
    theme.spacing[p] || `${theme.spacing[3]} ${theme.spacing[7]}`};
  border-radius: ${({ borderRadius }) => theme.spacing[borderRadius] || "0"};
  border: ${({ borderColor }) =>
    borderColor
      ? `1px solid ${theme.colors[borderColor]}`
      : `1px solid ${theme.colors.white}`};
  &:focus {
    outline: ${({ borderColor }) =>
      borderColor ? `1px solid ${theme.colors[borderColor]}` : `none`};
  }
  &:active {
    color: ${({ color }) => color || "white"};
    background-color: ${({ backgroundColor }) =>
      theme.colors[backgroundColor] || theme.colors.darkBlue};
    transform: translateY(2px);
  }
  &:hover {
    background-color: ${({ hoverColor }) =>
      theme.colors[hoverColor] || theme.colors.darkBlue};
    color: ${({ color }) => theme.colors[color] || theme.colors.white};
  }
`;

export const Button = styled.button`
  ${buttonCss}
`;

export const NavLinkButton = styled(Link)`
  ${buttonCss}
  text-decoration: none;
  padding: ${({ p }) => theme.spacing[p] || "1rem 4rem"};
  background-color: ${({ backgroundcolor }) =>
    theme.colors[backgroundcolor] || theme.colors.primary};
  &:active {
    transform: translateY(2px);
  }
`;
