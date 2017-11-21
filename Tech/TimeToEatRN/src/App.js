// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import configureStore, {
  clearSavedState,
  getSavedState
} from "./store/configureStore";
import { registerScreens } from "./Screens";
import { iconsMap, iconsLoaded } from "./utils/appicons";

class App extends Component {
  constructor(props) {
    super(props);
    Promise.all([getSavedState(), iconsLoaded]).then(values => {
      const store = configureStore(values[0]);
      registerScreens(store, Provider);
      this.startApp(store);
    });
  }
  startApp(store) {
    Navigation.startSingleScreenApp({
      screen: {
        label: "Map",
        screen: "tte.Map",
        navigatorStyle: {
          navBarCustomView: "tte.TitleDateNav"
        },
        navigatorButtons: {
          leftButtons: [
            {
              // title: "Menu",
              id: "map-to-menu",
              icon: iconsMap["ios-contact"]
            }
          ],
          rightButtons: [
            {
              // title: "Metrics",
              id: "map-to-metrics",
              icon: iconsMap["ios-pulse"]
            }
          ]
        }
      }
    });
  }
}
export default App;
