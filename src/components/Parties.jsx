import { Box, P } from "./UI";
import PropTypes from "prop-types";

const Parties = ({ parties }) => {
  return parties.map((party) => {
    const firstName = party.fields.find(
      (field) => field.type === "name" && field.order === 1
    );
    const lastName = party.fields.find(
      (field) => field.type === "name" && field.order === 2
    );
    const email = party.fields.find((field) => field.type === "email");
    const role = party.signatory_role === "signing_party" ? "Signer" : "Viewer";
    const company = party.fields.find((field) => field.type === "company");

    return (
      <Box
        key={`party_id_${party.id}`}
        backgroundColor="white"
        pt="2"
        pb="2"
        mt="1"
        borderRadius="4"
      >
        <Box display="flex">
          <Box flex="1">
            <P fontSize="3" isBold>
              Name
            </P>
            <P>
              {firstName.value} {lastName.value}
            </P>
          </Box>
          <Box flex="1">
            <P fontSize="3" isBold>
              Email
            </P>
            <P>{email.value}</P>
          </Box>
          <Box flex="1">
            <P fontSize="3" isBold>
              Role
            </P>
            <P>{role}</P>
          </Box>
          <Box flex="1">
            <P fontSize="3" isBold>
              Company
            </P>
            <P>{company.value}</P>
          </Box>
        </Box>
      </Box>
    );
  });
};

Parties.propTypes = {
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      signatory_role: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    })
  ).isRequired,
};

export default Parties;
