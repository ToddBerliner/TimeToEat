import React from "react";
import { Provider } from "react-redux";
import MapScreen from "../containers/MapScreen";
import "../styles/styles.css";

// App will eventually be router component
const App = ({ store }) => {
    return (
        <Provider store={store}>
            <MapScreen />
        </Provider>
    );
};

export default App;
