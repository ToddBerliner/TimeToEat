import { Navigation } from "react-native-navigation";

import MapScreen from "./containers/MapScreen";
import MenuScreen from "./containers/MenuScreen";
import MetricsScreen from "./containers/MetricsScreen";

export function registerScreens(store, Provider) {
  Navigation.registerComponent("tte.Map", () => MapScreen, store, Provider);
  Navigation.registerComponent("tte.Menu", () => MenuScreen, store, Provider);
  Navigation.registerComponent(
    "tte.Metrics",
    () => MetricsScreen,
    store,
    Provider
  );
}
