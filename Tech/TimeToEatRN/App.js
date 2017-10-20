// @flow
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import MapScreen from "./src/containers/MapScreen";
import { Font } from "expo";
import { Text } from "react-native";

export default class App extends React.Component {
  state = { ready: false };

  async _loadFont() {
    await Font.loadAsync({
      fugazone: require("./src/fonts/FugazOne-Regular.ttf")
    });
    this.setState({ ready: true });
  }

  componentWillMount() {
    this._loadFont();
  }

  render() {
    if (this.state.ready) {
      return (
        <Provider store={configureStore()}>
          <MapScreen />
        </Provider>
      );
    } else {
      return null;
    }
  }
}
