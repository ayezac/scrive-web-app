import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DocumentOverview from "./DocumentOverview";

const Document = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} component={DocumentOverview} />
    </Switch>
  );
};

export default Document;
