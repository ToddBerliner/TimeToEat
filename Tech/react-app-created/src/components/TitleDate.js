import React from "react";
import { months, getDow } from "../utils";

const TitleDate = props => {
    const today = new Date(parseInt(props.dayId, 10));
    const dow = getDow(today.getDay());
    const month = months[today.getMonth()];
    const date = today.getDate();
    const dateStr = `${dow}, ${month} ${date}`;
    return <div>{dateStr}</div>;
};

export default TitleDate;
