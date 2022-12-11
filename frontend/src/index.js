import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import configureAppStore from "../src/store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
