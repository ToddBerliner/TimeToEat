import React from "react";
import { TiTick, TiTimes } from "react-icons/lib/ti";
import { CHECKED, MISSED } from "../store/nodes/reducer";
import "../styles/styles.css";

const NodeRow = props => {
  /*
        - circle - onTap, onTapHold
        - text - onTap
    */
  let circleFillJsx;
  switch (props.status) {
    case CHECKED:
      circleFillJsx = (
        <div className="circleFill">
          <TiTick size="2em" />
        </div>
      );
      break;
    case MISSED:
      circleFillJsx = (
        <div className="circleFill">
          <TiTimes size="2em" />
        </div>
      );
      break;
    default:
      circleFillJsx = "";
  }

  return (
    <div className={props.selected ? "nodeRowSelected" : "nodeRow"}>
      <div className="circle pointer" onClick={props.onClick}>
        {circleFillJsx}
      </div>
      <div className="nodeNameBlock">
        <div className="nodeName">{props.name}</div>
        <div>{props.time}</div>
      </div>
    </div>
  );
};

export default NodeRow;
