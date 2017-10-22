// useful array with days in order of JS "day"
export const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
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
  if (dir === "prev") {
    adjacentDate = (d => new Date(d.setDate(d.getDate() - 1)))(
      getDateFromKey(dateKey)
    );
  }
  if (dir === "next") {
    adjacentDate = (d => new Date(d.setDate(d.getDate() + 1)))(
      getDateFromKey(dateKey)
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

export function getFriendlyTime(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // let { hours, minutes } = timeObj;
  if (hours === 0 && minutes === 0) {
    return "Midnight";
  }
  if (hours === 12 && minutes === 0) {
    return "Noon";
  }
  let ampm = "am";
  if (hours > 12) {
    ampm = "pm";
    hours = hours - 12;
  }
  if (hours === 0) hours = "12";
  minutes = minutes === 0 ? "" : `:${minutes}`;

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
      target: planDay.waterTarget
    },
    nodeIds: nodeIdsArr,
    offPlanNodeIds: []
  };
  return day;
}
export function createNodesFromPlanDay(dateKey, planDay) {
  const nodes = [];
  planDay.nodes.forEach(function(node, idx) {
    nodes.push({
      id: `${dateKey}_${idx}`,
      name: node.name,
      time: getTimestampFromTimeObj(dateKey, node.time),
      items: node.items.slice(),
      completedTime: null
    });
  });
  return nodes;
}
