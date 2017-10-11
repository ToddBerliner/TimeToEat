// @flow
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import MapScreen from "./src/containers/MapScreen";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <MapScreen />
      </Provider>
    );
  }
}
