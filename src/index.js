import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./resources/font-awesome/scss/font-awesome.scss";
import "./index.scss";
import App from "./components/App/App";
import CircleRating from "./components/CircleRating/CircleRating";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<CircleRating rating={80} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
