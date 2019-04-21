import React, { Component, Fragment } from "react";
import { purTest } from "../../utils/tests";
import Button from "@material-ui/core/Button";

class LeftPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //componentDidMount() {}

  //static getDerivedStateFromProps(props, state) { return null; }

  //shouldComponentUpdate(nextProps, nextState) {}

  //componentDidUpdate(prevProps, prevState) {}

  //componentDidCatch(error, info) {}

  //componentWillUnmount() {}

  render() {
    const { location } = this.props;
    let hash = location.hash;
    return (
      <div className="test-left-menu-root">
        {purTest.map((test, i) => {
          return (
            <a
              key={i}
              href={`#${test.testName}`}
              // tabIndex="-1"
              className={`test-menu-item ${
                hash === `#${test.testName}` ? "test-anch-focus" : ""
              }`}
              // onClick={() => {}}
            >
              <p>{test.heading}</p>
            </a>
          );
        })}
      </div>
    );
  }
}

export default LeftPanel;
