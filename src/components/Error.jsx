import React from "react";
import PropTypes from "prop-types";

import { P, Box } from "./UI";

const Error = ({ error }) => (
  <Box display="flex" justifyContent="center" backgroundColor="white">
    <P color="warning" fontSize="4">
      {error}
    </P>
  </Box>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
export default Error;
