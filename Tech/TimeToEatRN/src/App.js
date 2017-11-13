// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import configureStore from "./store/configureStore";
import { registerScreens } from "./Screens";

const store = configureStore();

registerScreens(store, Provider);

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
  ]
});
