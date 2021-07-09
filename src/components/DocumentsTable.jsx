import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "../constants";
import { Box, P, H5, StyledLink } from "./UI";

const Table = styled.table`
  width: 100%;
`;
const Td = styled.td`
  padding: ${theme.spacing[3]};
  width: 250px;
  background-color: ${theme.colors.grayLight};
`;
const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid ${theme.colors.primary};
  padding: ${theme.spacing[3]};
  color: ${theme.colors.primary};
`;

const DocumentsTable = ({ documents }) => {
  const tableHeaders = ["Status", "Title & Parties"];

  return (
    <Table>
      <thead>
        <tr>
          {tableHeaders.map((thead) => {
            return (
              <Th key={`table_header_${thead}`}>
                <H5>{thead}</H5>
              </Th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => {
          const status =
            doc.status.charAt(0).toUpperCase() + doc.status.slice(1);
          return (
            <tr key={`doc_id_${doc.id}`}>
              <Td>
                <P>{status}</P>
              </Td>
              <Td>
                <StyledLink to={`/app/document/${doc.id}`}>
                  {doc.title}
                </StyledLink>
                <P>
                  {doc.parties.map((party) => {
                    const firstName = party.fields.find(
                      (field) => field.type === "name" && field.order === 1
                    );
                    const lastName = party.fields.find(
                      (field) => field.type === "name" && field.order === 2
                    );
                    const isAuthor = party.is_author ? "(Author)" : "";

                    return (
                      <Box
                        display="flex"
                        key={`parties_id_${party.id}`}
                        pb="0"
                        pt="0"
                        pl="0"
                      >
                        <P fontSize="3" pr="2">
                          {firstName.value}
                        </P>
                        <P fontSize="3" pr="2">
                          {lastName.value}
                        </P>
                        <P fontSize="3" pr="2">
                          {isAuthor}
                        </P>
                      </Box>
                    );
                  })}
                </P>
              </Td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

DocumentsTable.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      parties: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
};

export default DocumentsTable;
