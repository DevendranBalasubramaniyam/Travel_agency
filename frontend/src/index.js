import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {transitions, positions,Provider as AlertProvider} from "react-alert";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";

const options = {
  
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  
  transition: transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </AlertProvider>
  </Provider>
);

