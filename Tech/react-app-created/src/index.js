import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import App from "./containers/App";

ReactDOM.render(
    <App store={configureStore()} />,
    document.getElementById("root")
);
