// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import configureStore, {
  clearSavedState,
  getSavedState
} from "./store/configureStore";
import { registerScreens } from "./Screens";

class App extends Component {
  constructor(props) {
    super(props);
    getSavedState().then(state => {
      const store = configureStore(state);
      registerScreens(store, Provider);
      this.startApp(store);
    });
  }
  startApp(store) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: "Menu",
          screen: "tte.Menu",
          title: "Menuola",
          navigatorButtons: {
            rightButtons: [
              {
                title: "Map >",
                id: "menu-to-map"
              }
            ]
          }
        },
        {
          label: "Map",
          screen: "tte.Map",
          title: "< Title Date Here >",
          navigatorButtons: {
            leftButtons: [
              {
                title: "Menu",
                id: "map-to-menu"
              }
            ],
            rightButtons: [
              {
                title: "Metrics",
                id: "map-to-metrics"
              }
            ]
          }
        },
        {
          label: "Metrics",
          screen: "tte.Metrics",
          title: "Metricsola",
          navigatorButtons: {
            leftButtons: [
              {
                title: "< Map",
                id: "metrics-to-map"
              }
            ]
          }
        }
      ],
      tabsStyle: {
        initialTabIndex: 1 // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
      }
    });
  }
}
export default App;
