import React, { Component } from "react";
import { Image, Text } from "react-native";
import { Provider } from "react-redux";

import { configureStore, getSavedState } from "../store/configureStore";
import { registerAsyncScreens } from "../Screens";
import { iconsMap, iconsLoaded } from "../utils/appicons";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("LoadingScreen mounted");
    // load up rest of app
    iconsLoaded.then(() => {
      getSavedState()
        .then(savedState => {
          const store = configureStore(savedState);
          registerAsyncScreens(store, Provider);
          // push map screen
          this.props.navigator.push({
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
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    return (
      <Image
        source={require("../images/splash.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          width: "100%"
        }}
      />
    );
  }
}

export default LoadingScreen;
