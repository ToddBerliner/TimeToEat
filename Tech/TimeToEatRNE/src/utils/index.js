import { Notifications } from "expo";
import Colors from "../styles/colors";

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

export const shortMonths = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export function getDow(dayIndex) {
  return DOW[dayIndex] || null;
}

export function getMonth(monthIndex) {
  return months[monthIndex] || null;
}

export function getDateKey(date = new Date()) {
  if (!date.getYear()) return undefined;
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
export function getIdsFromKey(key) {
  const keyParts = key.split("_");
  return { dayId: keyParts[0], timestamp: keyParts[1] };
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

export function addDays(date = new Date(), days = 1) {
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

export function getDateKeyForCal(someKindOfDate) {
  let date = null;
  if (someKindOfDate.getYear) {
    date = someKindOfDate;
  } else if (typeof someKindOfDate === "string") {
    date = new Date(parseInt(someKindOfDate, 10));
  } else if (typeof someKindOfDate === "number") {
    date = new Date(someKindOfDate);
  }

  if (!date) return undefined;

  const calYear = date.getFullYear();
  let calMonth = date.getMonth() + 1;
  calMonth = calMonth < 10 ? `0${calMonth}` : calMonth;
  let calDate = date.getDate();
  calDate = calDate < 10 ? `0${calDate}` : calDate;

  return `${calYear}-${calMonth}-${calDate}`;
}

export function getNotificationTimeFromTimeObj(timeObj) {
  try {
    const timestamp = getTimestampFromTimeObj(getDateKey(), timeObj);
    if (timestamp < new Date().getTime()) {
      const tomorrow = addDays(new Date(timestamp));
      return tomorrow.getTime();
    } else {
      return timestamp;
    }
  } catch (err) {
    return undefined;
  }
}

export function getFriendlyDate(timestamp, useShortMonths = false) {
  if (typeof timestamp === "string") {
    timestamp = parseInt(timestamp, 10);
  }
  const today = new Date(timestamp);
  const dow = getDow(today.getDay());
  const month = useShortMonths
    ? shortMonths[today.getMonth()]
    : months[today.getMonth()];
  const date = today.getDate();
  return `${dow}, ${month} ${date}`;
}

export function getDayWithSup(date) {
  // date = 1-31, not a date object
  let dateStr = date.toString();
  const supMap = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    "4": "th",
    "5": "th",
    "6": "th",
    "7": "th",
    "8": "th",
    "9": "th",
    "0": "th",
  };
  const sub = supMap[dateStr.substring(dateStr.length - 1)];
  return `${dateStr}${sub}`;
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
  if (hours >= 12) {
    ampm = "pm";
    hours = hours - 12;
  }
  if (hours === 0) hours = "12";
  minutes = minutes === "00" ? "" : `:${minutes}`;

  return `${hours}${minutes}${ampm}`;
}

export function createDayAndNodes(dateKey, planDay, prevWeight = 0) {
  // create the nodes
  const nodes = createNodesFromPlanDay(dateKey, planDay);
  const nodeIdsArr = nodes.map(node => node.id);
  // create the day
  const day = createDayFromPlanDay(dateKey, planDay, nodeIdsArr, prevWeight);
  return { day, nodes };
}

export function createDayFromPlanDay(
  dateKey,
  planDay,
  nodeIdsArr,
  prevWeight = 0,
) {
  const day = {
    id: dateKey,
    water: {
      completedTimes: [],
      target: planDay.waterTarget,
    },
    nodeIds: nodeIdsArr,
    offPlanNodeIds: [],
    weight: prevWeight,
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
      tracking: node.tracking,
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

export function getColorFromNodes(nodes) {
  let trackedCount = 0;
  let completedCount = 0;
  // count tracked nodes
  for (const node of nodes) {
    // early return if node is snack type
    if (node.type === "offplan") {
      return Colors.calRed;
    }
    if (node.tracking) {
      trackedCount++;
      if (node.completedTime !== null) {
        completedCount++;
      }
    }
  }
  // count completed nodes
  const completedPct = completedCount / trackedCount;
  if (completedPct === 1) {
    return Colors.calGreen;
  }
  if (completedPct >= 0.5 && completedPct < 1) {
    return Colors.calYellow;
  }
  return Colors.calRed;
}
