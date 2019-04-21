import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Home from "../src/screens/home/Home";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0, loading: false };
  }

  render() {
    return (
      <div className="app-root-container">
        <Home {...this.props} />
      </div>
    );
  }
}

export default App;
// "proxy": "http://localhost:3001",
