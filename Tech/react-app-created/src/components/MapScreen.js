import React from "react";
import {
    appWrap,
    header,
    footer,
    addIcon,
    left,
    right,
    center,
    date,
    waterPieWrap,
    appHolder
} from "../styles/styles.css";
import { TiThMenu, TiDelete } from "react-icons/lib/ti";

// MapScreen is a route in the App
const MapScreen = () => {
    return (
        <div id="app-map" className="appWrap">
            <div className="header">
                <div className="left">
                    <TiThMenu size="1.2em" className="left" />
                </div>
                <div className="center date">TitleDate</div>
                <div className="right">
                    <TiDelete className="addIcon" size="1.5em" />
                </div>
            </div>
            <div className="content">NodeRows</div>
            <div className="footer">
                <div className="waterPieWrap">
                    <div>Water</div>
                </div>
            </div>
        </div>
    );
};

export default MapScreen;
