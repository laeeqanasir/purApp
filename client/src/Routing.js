import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import FileWriter from "./screens/fileWriter/fileWriter";
import WithRootHOC from "./screens/withRootHOC";
import FileUploader from "./screens/fileuploader/FileUploader";
import TestComponent from "./screens/test/index";

/**
 * insert every page here in routes
 */
export const routes = [
  { path: "/", component: App, name: "Home" },
  { path: "/test", component: TestComponent, name: "PUR test" },
  { path: "/file", component: FileWriter, name: "File writer" },
  { path: "/upload", component: FileUploader, name: "File upload" }
];

export default () => {
  //Switch will render first child as default.
  return (
    <Router>
      <Switch>
        {routes.map((r, i) => {
          return (
            <Route
              key={i}
              path={r.path}
              exact
              render={props => {
                return <WithRootHOC {...props} component={r.component} />;
              }}
            />
          );
        })}
      </Switch>
    </Router>
  );
};
