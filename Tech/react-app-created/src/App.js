import React from "react";
import MapScreen from "./components/MapScreen";
import { appHolder } from "./styles/styles.scss";

// App will eventually be router component
const App = () => {
    return (
        <div className="appHolder">
            <MapScreen />
        </div>
    );
};

export default App;
