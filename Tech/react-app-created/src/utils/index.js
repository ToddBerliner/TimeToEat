// useful array with days in order of JS "day"
export const DOW = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];

export const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
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

export function getYesterdayDateKey() {
    let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());
    return getDateKey(yesterday);
}

function addDays(date = new Date(), days = 1) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getDayIdsBetweenDayIds(firstDayId, secondDayId) {
    const dayIds = [];
    const firstDate = new Date(parseInt(firstDayId));
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
        const date = new Date(parseInt(dateKey));
        date.setHours(timeObj.hours);
        date.setMinutes(timeObj.minutes);
        return date.getTime();
    } catch (err) {
        return undefined;
    }
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
    planDay.nodes.map((node, idx) => {
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
