import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Dimensions, Image } from "react-native";
import { Provider } from "react-redux";
import configureStore, {
  getSavedState,
  clearSavedState,
} from "./src/store/configureStore";

import { AppLoading, Asset, Font } from "expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import NavSwitch from "./src/containers/NavSwitch";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component {
  state = {
    loaded: false,
    store: null,
  };

  _loadResourcesAsync = async () => {
    const getState = AsyncStorage.getItem("@state")
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
      });
    const getImages = cacheImages([
      require("./assets/icon.png"),
      require("./assets/splash.png"),
      require("./assets/images/welcome_icon.png"),
      require("./assets/images/notification_icon.png"),
      require("./assets/backgrounds/board.png"),
      require("./assets/backgrounds/board_lt.png"),
      require("./assets/backgrounds/herbs.png"),
      require("./assets/backgrounds/herbs_lt.png"),
      require("./assets/backgrounds/nuts.png"),
      require("./assets/backgrounds/nuts_lt.png"),
      require("./assets/backgrounds/scheme_board.png"),
      require("./assets/backgrounds/scheme_herbs.png"),
      require("./assets/backgrounds/scheme_nuts.png"),
    ]);
    const getFonts = Font.loadAsync({
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
      "fugaz-one-regular": require("./assets/fonts/FugazOne-Regular.ttf"),
    });
    await Promise.all([getState, getImages, getFonts]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleBeingLoaded = values => {
    this.setState({ loaded: true });
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
