export const PREV = "prev";
export const NEXT = "next";

// TODO: update all uses of "date" as a variable name to "dateObj"!!!

// useful array with days in order of JS "day"
export const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDow(dayIndex) {
  return DOW[dayIndex] || null;
}

export function getMonth(monthIndex) {
  return months[monthIndex] || null;
}

export function getDateKey(date = new Date()) {
  const keyMonth = date.getMonth();
  const keyDate = date.getDate();
  const keyYear = date.getFullYear();
  return new Date(keyYear, keyMonth, keyDate).getTime().toString();
}

export function getDateFromKey(date) {
  try {
    return new Date(parseInt(date, 10));
  } catch (err) {
    return undefined;
  }
}

export function getAdjacentDateKey(dateKey, dir) {
  let adjacentDate;
  if (dir === PREV) {
    adjacentDate = (d => new Date(d.setDate(d.getDate() - 1)))(
      getDateFromKey(dateKey),
    );
  }
  if (dir === NEXT) {
    adjacentDate = (d => new Date(d.setDate(d.getDate() + 1)))(
      getDateFromKey(dateKey),
    );
  }
  return getDateKey(adjacentDate);
}

export function getYesterdayDateKey() {
  const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());
  return getDateKey(yesterday);
}

function addDays(date = new Date(), days = 1) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDayIdsBetweenDayIds(firstDayId, secondDayId) {
  const dayIds = [];
  const firstDate = new Date(parseInt(firstDayId, 10));
  let dateToAdd = addDays(firstDate);
  let dayId = getDateKey(dateToAdd);

  let loopControl = 0;
  while (dayId <= secondDayId && loopControl < 100) {
    dayIds.push(dayId);
    dateToAdd = addDays(dateToAdd);
    dayId = getDateKey(dateToAdd);
    loopControl++;
  }
  return dayIds;
}

export function getTimestampFromTimeObj(dateKey, timeObj) {
  try {
    const date = new Date(parseInt(dateKey, 10));
    date.setHours(timeObj.hours);
    date.setMinutes(timeObj.minutes);
    return date.getTime();
  } catch (err) {
    return undefined;
  }
}

export function getTimeObjFromDate(date) {
  try {
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
  } catch (err) {
    return undefined;
  }
}

export function getFriendlyDate(timestamp) {
  if (typeof timestamp === "string") {
    timestamp = parseInt(timestamp, 10);
  }
  const today = new Date(timestamp);
  const dow = getDow(today.getDay());
  const month = months[today.getMonth()];
  const date = today.getDate();
  return `${dow}, ${month} ${date}`;
}

export function getFriendlyTime(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);
  // let { hours, minutes } = timeObj;
  if (hours === 0 && minutes === "00") {
    return "Midnight";
  }
  if (hours === 12 && minutes === "00") {
    return "Noon";
  }
  let ampm = "am";
  if (hours > 12) {
    ampm = "pm";
    hours = hours - 12;
  }
  if (hours === 0) hours = "12";
  minutes = minutes === "00" ? "" : `:${minutes}`;

  return `${hours}${minutes}${ampm}`;
}

export function createDayAndNodes(dateKey, planDay) {
  // create the nodes
  const nodes = createNodesFromPlanDay(dateKey, planDay);
  const nodeIdsArr = nodes.map(node => node.id);
  // create the day
  const day = createDayFromPlanDay(dateKey, planDay, nodeIdsArr);
  return { day, nodes };
}

export function createDayFromPlanDay(dateKey, planDay, nodeIdsArr) {
  const day = {
    id: dateKey,
    water: {
      completedTimes: [],
      target: planDay.waterTarget,
    },
    nodeIds: nodeIdsArr,
    offPlanNodeIds: [],
  };
  return day;
}

export function createNodesFromPlanDay(dateKey, planDay) {
  const nodes = [];
  planDay.nodes.forEach(function(node) {
    const planned_timestamp = getTimestampFromTimeObj(dateKey, node.time);
    nodes.push({
      type: "plan", // can't import this TODO?!?
      id: `${dateKey}_${planned_timestamp}`,
      name: node.name,
      time: planned_timestamp,
      items: node.items.slice(),
      completedTime: null,
    });
  });
  return nodes;
}

export function createSnackNode(dateKey, timestamp) {
  return {
    type: "offplan", // can't import this TODO?!?
    id: `${dateKey}_${timestamp}`,
    time: timestamp,
    completedTime: timestamp,
  };
}
