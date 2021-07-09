import React, { useEffect, useState } from "react";
import { Page, Box, H4, P } from "../../components/UI";
import { get } from "../../utils/api";
import DocumentTable from "../../components/DocumentsTable";
import Error from "../../components/Error";

const Trash = () => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getDocuments = async () => {
      const params = encodeURIComponent(
        JSON.stringify([
          {
            filter_by: "is_in_trash",
          },
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
        <H4 color="white">In Trash</H4>
      </Box>
      {documents.length ? (
        <DocumentTable documents={documents} />
      ) : (
        <P>No documents in trash</P>
      )}
    </Page>
  );
};

export default Trash;
