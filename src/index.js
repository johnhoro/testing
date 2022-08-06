import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import configureStore from "./store/configureStore";
import "./index.css";

import App from "./container/App";

// // setup fake backend
// import { configureFakeBackend } from './helpers/fake-backend';
// configureFakeBackend();

const store = configureStore();

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
