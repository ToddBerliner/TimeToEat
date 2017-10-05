import React from "react";
import { connect } from "react-redux";
import "../styles/styles.css";
import { TiThMenu, TiDelete } from "react-icons/lib/ti";
import TitleDate from "../components/TitleDate";
import WaterPie from "../components/WaterPie";
import NodeRows from "../components/NodeRows";
import {
    _getSelectedDayId,
    _getDayById,
    _getNodesByIds
} from "../store/reducer";
import { tapWater, tapAndHoldWater } from "../store/days/reducer";
import { tapNode, tapAndHoldNode } from "../store/nodes/reducer";

// MapScreen is a route in the App
const MapScreen = props => {
    return (
        <div id="app-map" className="appWrap">
            <div className="header">
                <div className="left">
                    <TiThMenu size="1.2em" className="left" />
                </div>
                <div className="center date">
                    <TitleDate dayId={props.dayId} />
                </div>
                <div className="right">
                    <TiDelete className="addIcon" size="1.5em" />
                </div>
            </div>
            <div className="content">
                <NodeRows
                    dayId={props.dayId}
                    nodes={props.nodes}
                    tap={nodeId => props.tapNode(nodeId, new Date().getTime())}
                />
            </div>
            <div className="footer">
                <div className="waterPieWrap">
                    {/*
                        Trying WaterPie as component and NodeRows as
                        container to think the difference through
                    */}
                    <WaterPie
                        count={props.waterCount}
                        tap={() => {
                            props.tapWater(props.dayId, new Date().getTime());
                        }}
                        tapAndHold={props.tapAndHoldWater}
                    />
                    <div>Water</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const dayId = _getSelectedDayId(state);
    const dayObj = _getDayById(state, dayId);
    const nodes = _getNodesByIds(state, dayObj.nodeIds);
    return {
        dayId,
        waterCount: dayObj.water.completedTimes.length,
        nodes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        tapWater: (dayId, time) => {
            dispatch(tapWater(dayId, time));
        },
        tapAndHoldWater,
        tapNode: (nodeId, time) => {
            dispatch(tapNode(nodeId, time));
        },
        tapAndHoldNode
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
