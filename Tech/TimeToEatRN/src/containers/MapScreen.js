import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import TitleDate from "../components/TitleDate";
// import WaterPie from "../components/WaterPie";
// import NodeRows from "../components/NodeRows";
import {
    _getSelectedDayId,
    _getDayById,
    _getNodesByIds
} from "../store/reducer";
import { selectDay } from "../store/uiState/reducer";
import { tapWater, tapAndHoldWater } from "../store/days/reducer";
import { tapNode, tapAndHoldNode } from "../store/nodes/reducer";
import { getAdjacentDateKey } from "../utils";
import Icon from "react-native-vector-icons/Ionicons";
// MapScreen is a route in the App
const MapScreen = props => {
    // TODO: get status bar height in order to create top space
    return (
        <View style={styles.appWrap}>
            <View style={styles.titleRow}>
                <View style={styles.titleRowLeft}>
                    <Icon name="ios-contact" size={24} />
                </View>
                <View style={styles.titleRowCenter}>
                    <TitleDate dayId={props.dayId} />
                </View>
                <View style={styles.titleRowRight}>
                    <Icon name="ios-pulse" size={24} />
                </View>
            </View>
            <View style={styles.flexBox} />
            <View style={styles.box} />
        </View>
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
        tapAndHoldNode,
        selectDay: (dayId, dir) => {
            const newDayId = getAdjacentDateKey(dayId, dir);
            dispatch(selectDay(newDayId));
        }
    };
};

const styles = StyleSheet.create({
    appWrap: {
        backgroundColor: "rgb(245, 245, 245)",
        flex: 1,
        paddingTop: 50
    },
    box: {
        backgroundColor: "rgb(102, 102, 102)",
        height: 50
    },
    flexBox: {
        flex: 1
    },
    titleRow: {
        height: 36,
        flexDirection: "row",
        alignItems: "center"
    },
    titleRowLeft: {
        width: 38,
        height: 36,
        alignItems: "center",
        justifyContent: "center"
    },
    titleRowRight: {
        width: 38,
        height: 36,
        alignItems: "center",
        justifyContent: "center"
    },
    titleRowCenter: {
        flex: 1,
        height: 36,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
