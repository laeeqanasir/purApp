import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import Header from "./Header";

class WithRootHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      completed: 0
    };
  }
  handleLodaing = state => {
    this.setState({ loading: state });
  };

  handleProgress = completed => {
    this.setState({ completed });
  };

  render() {
    const { loading, completed = 0 } = this.state;
    const { component: ChildComponent, location, ...others } = this.props;
    const pageRoute = location.pathname; // getting current path name from routing
    const props = {
      ...others,
      loading,
      location,
      completed,
      handleProgress: this.handleProgress,
      handleLodaing: this.handleLodaing
    };
    return (
      <div className="app-root">
        {pageRoute !== "/" && (
          <Header {...props} />
        ) /*if page is home page dont show header*/}
        <ChildComponent {...props} />
        {loading && (
          <div className="loader">
            {/* <CircularProgress size={50} /> */}
            <LinearProgress
              variant="buffer"
              value={completed}
              valueBuffer={100}
              color="secondary"
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(WithRootHOC);
