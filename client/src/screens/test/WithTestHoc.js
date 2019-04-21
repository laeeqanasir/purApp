import React, { Component, Fragment } from "react";
import LeftPanel from "./LeftPanel";

export default WrappedComponent => {
  class WithTestHoc extends Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return (
        <div className="test-parent-root">
          {/* <LeftPanel {...this.props} /> */}
          <div className="right-panel-test-root">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  return WithTestHoc;
};
