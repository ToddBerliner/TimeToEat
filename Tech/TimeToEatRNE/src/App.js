import React from "react";
import { Provider } from "react-redux";
import configureStore, {
  getSavedState,
  clearSavedState
} from "./store/configureStore";
import MapScreen from "./containers/MapScreen";
import { Text, Image, View, ActivityIndicator } from "react-native";

import AppWithNavigationState from "./navigators/AppNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: null
    };
  }

  componentWillMount() {
    getSavedState()
      .then(values => {
        const store = configureStore(values);
        this.setState({
          isStoreLoading: false,
          store
        });
      })
      .catch(err => {
        console.log(err);
        // start fresh
        const store = configureStore();
        this.setState({
          isStoreLoading: false,
          store
        });
      });
    // set the loading state
    this.setState({ isStoreLoading: true });
  }

  render() {
    const { isStoreLoading, store } = this.state;
    if (!isStoreLoading) {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    } else {
      return <ActivityIndicator animating={isStoreLoading} size="large" />;
    }
  }
}
