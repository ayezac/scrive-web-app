import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Page, Box, H4, H5, P, Button } from "../../../components/UI";
import { get } from "../../../utils/api";
import Parties from "../../../components/Parties";
import Error from "../../../components/Error";

const DocumentOverview = () => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  const [showParties, setShowParties] = useState(true);
  const [showDocument, setShowDocument] = useState(false);
  const [showMore, setMore] = useState(false);
  const match = useRouteMatch();
  const docId = match.params.documentId;
  console.log(document);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await get({ endpoint: `documents/${docId}/get` });
        setDocument(response);
      } catch (err) {
        setError("An error occurred. " + err.message);
      }
    };
    getDocument();
  }, [docId]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Page p="2">
      <Box backgroundColor="primary" mb="4">
        <H4 color="white">Document Overview</H4>
      </Box>
      <Box display="flex">
        <Button
          onClick={() => {
            setShowParties(true);
            setShowDocument(false);
            setMore(false);
          }}
          m="0"
          backgroundColor={showParties ? "darkBlue" : "blue"}
        >
          Parties
        </Button>
        <Button
          m="0"
          onClick={() => {
            setShowDocument(true);
            setShowParties(false);
            setMore(false);
          }}
          backgroundColor={showDocument ? "darkBlue" : "blue"}
        >
          Document
        </Button>
        <Button
          m="0"
          onClick={() => {
            setShowDocument(false);
            setShowParties(false);
            setMore(true);
          }}
          backgroundColor={showMore ? "darkBlue" : "blue"}
        >
          More
        </Button>
      </Box>

      {document && showParties ? (
        <Box mb="3">
          <Parties parties={document.parties} />
        </Box>
      ) : null}

      {document && showDocument ? (
        <Box mb="3">
          <Box>
            <H5>Document Title</H5>
            <P>{document.title}</P>
          </Box>
        </Box>
      ) : null}
      {document && showMore ? (
        <Box mb="3">
          <Box backgroundColor="white">
            <Box>
              <H5>Days to sign:</H5>
              <P>{document.days_to_sign}</P>
            </Box>
            <Box>
              <H5>Invitation Message:</H5>
              <P>{document.invitation_message}</P>
            </Box>
            <Box>
              <H5>Language:</H5>
              <P>{document.lang}</P>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Page>
  );
};

export default DocumentOverview;
