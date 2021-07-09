import React, { useEffect, useState } from "react";
import { Page, Box, H4, P } from "../../components/UI";
import { get } from "../../utils/api";
import DocumentTable from "../../components/DocumentsTable";
import Error from "../../components/Error";

const Signed = () => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDocuments = async () => {
      const params = encodeURIComponent(
        JSON.stringify([
          {
            filter_by: "status",
            statuses: ["closed"],
          },
          { filter_by: "is_not_in_trash" },
        ])
      );
      try {
        const response = await get({
          endpoint: `documents/list?filter=${params}`,
        });

        setDocuments(response.documents);
        setLoading(false);
      } catch (err) {
        setError("An error occurred. " + err.message);
      }
    };
    getDocuments();
  }, []);

  if (loading) {
    return <P fontSize="5">Loading...</P>;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <Page>
      <Box backgroundColor="primary" mb="4">
        <H4 color="white">Signed</H4>
      </Box>

      {documents.length ? (
        <DocumentTable documents={documents} />
      ) : (
        <P>No signed documents</P>
      )}
    </Page>
  );
};

export default Signed;
