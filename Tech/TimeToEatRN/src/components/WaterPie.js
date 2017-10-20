import React from "react";
import wp0 from "../images/wp0@3x.png";
import wp1 from "../images/wp1@3x.png";
import wp2 from "../images/wp2@3x.png";
import wp3 from "../images/wp3@3x.png";
import wp4 from "../images/wp4@3x.png";
import wp5 from "../images/wp5@3x.png";
import wp6 from "../images/wp6@3x.png";
import wp7 from "../images/wp7@3x.png";
import wp8 from "../images/wp8@3x.png";
import "../styles/styles.css";
const slices = [wp0, wp1, wp2, wp3, wp4, wp5, wp6, wp7, wp8];

const WaterPie = props => {
  return (
    <img
      src={slices[props.count]}
      className="pointer"
      width="48"
      height="48"
      onClick={() => {
        if (props.count < 8) {
          props.tap();
        }
      }}
      alt="Water cup"
    />
  );
};

export default WaterPie;
