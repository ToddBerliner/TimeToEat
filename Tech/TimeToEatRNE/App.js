import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Dimensions } from "react-native";
import { Provider } from "react-redux";
import configureStore, {
  getSavedState,
  clearSavedState,
} from "./src/store/configureStore";

import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import NavSwitch from "./src/containers/NavSwitch";

export default class App extends Component {
  state = {
    loaded: false,
    store: null,
  };

  render() {
    const { loaded, store } = this.state;
    if (!loaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleBeingLoaded}
        />
      );
    } else {
      const { uiState } = store.getState();
      return (
        <Provider store={store}>
          <NavSwitch />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    const getState = AsyncStorage.getItem("@state");
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
        require("./assets/images/wp0.png"),
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        "fugaz-one-regular": require("./assets/fonts/FugazOne-Regular.ttf"),
      }),
      getState
        .then(savedState => {
          let state = undefined;
          if (savedState !== null) {
            state = JSON.parse(savedState);
          }
          const store = configureStore(state);
          this.setState({ store });
        })
        .catch(err => {
          console.error("Err saving state:", err);
        }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleBeingLoaded = values => {
    this.setState({ loaded: true });
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  styledText: {
    fontFamily: "fugaz-one-regular",
  },
});
