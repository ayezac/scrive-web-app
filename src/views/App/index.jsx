import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AllDocuments from "./AllDocuments";
import Document from "./Document";
import { Box, Page } from "../../components/UI";
import Sidebar from "../../components/Sidebar";
import Drafts from "./Drafts";
import Trash from "./Trash";
import Signed from "./Signed";

const App = () => {
  const match = useRouteMatch();

  return (
    <Page>
      <Sidebar />
      <Box style={{ marginLeft: "220px" }}>
        <Switch>
          <Route
            path={`${match.path}/document/:documentId`}
            component={Document}
          />
          <Route path={`${match.path}/drafts`} component={Drafts} />
          <Route path={`${match.path}/trash`} component={Trash} />
          <Route path={`${match.path}/signed`} component={Signed} />
          <Route path={`${match.path}`} component={AllDocuments} />
        </Switch>
      </Box>
    </Page>
  );
};

export default App;
