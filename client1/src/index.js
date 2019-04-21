import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routing";
import * as serviceWorker from "./serviceWorker";

/**
 * this is root file all components are registered inside Routes,
 * Routes files exposing first component from array of components which is App.js
 * so basically  App.js is file which render first inside "root" tag div in public/index.html
 *
 */
ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
