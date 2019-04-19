import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { routes } from "../Routing";
import "../App.css";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, history, loading, location } = this.props;
    const tabIndex = location.pathname; // getting current path name from routing
    return (
      <div className="app-root-container">
        <div className="app-header">
          {routes.map((r, i) => {
            return (
              <p
                key={i}
                className={tabIndex === r.path ? "focus" : ""}
                onClick={() => history.push(r.path)}
              >
                {r.name}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
// "proxy": "http://localhost:3001",
