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
    Navigation.startSingleScreenApp({
      screen: {
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
      drawer: {
        left: {
          screen: "tte.Menu",
          side: "left"
        },
        style: {
          leftDrawerWidth: 100
        }
      }
    });
  }
}
export default App;
