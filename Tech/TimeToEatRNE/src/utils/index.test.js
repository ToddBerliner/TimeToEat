import {
  getDow,
  getMonth,
  getDateKey,
  getFriendlyTime,
  getAdjacentDateKey,
  getYesterdayDateKey,
  createDayFromPlanDay,
  createNodesFromPlanDay,
  getTimestampFromTimeObj,
  getDayIdsBetweenDayIds,
  createDayAndNodes,
  createSnackNode,
  getTimeObjFromDate,
  getNotificationTimeFromTimeObj,
  getDateKeyForCal,
  addDays,
  getColorFromNodes,
} from "./";
import Colors from "../styles/colors";
import * as daysFixtures from "../store/days/fixtures";
import * as nodesFixtures from "../store/nodes/fixtures";

describe("Generic Utilities", () => {
  test("it returns the day of the week for the given index or null", () => {
    expect(getDow(0)).toBe("Sunday");
    expect(getDow(7)).toBeNull();
    expect(getDow()).toBeNull();
  });
  test("it returns the month for the given index or null", () => {
    expect(getMonth(0)).toBe("January");
    expect(getMonth(12)).toBeNull();
    expect(getMonth()).toBeNull();
  });
  test("it returns a timestamp for a given day and plan node time object", () => {
    const dateKey = getDateKey(new Date(2017, 1, 1));
    const timeObj = {
      hours: 4,
      minutes: 30,
    };
    const timestamp = getTimestampFromTimeObj(dateKey, timeObj);
    expect(timestamp).toBe(1485952200000);
  });
  test("it returns a time object from a javascript date object", () => {
    const date = new Date("2018-02-16T03:15:00.000Z");
    const expectedTimeObj = {
      hours: 19,
      minutes: 15,
    };
    const timeObj = getTimeObjFromDate(date);
    expect(timeObj).toEqual(expectedTimeObj);
  });
  test("it returns the friendly time for a given timestamp", () => {
    let timestamp = 1518714394593;
    expect(getFriendlyTime(timestamp)).toBe("9:06am");
    timestamp = 1507134600000;
    expect(getFriendlyTime(timestamp)).toBe("9:30am");
    timestamp = 1507165200000;
    expect(getFriendlyTime(timestamp)).toBe("6pm");
  });
  test("it returns a dayAndNodes object for a given dateKey", () => {
    expect(
      createDayAndNodes(daysFixtures.dateKeyMonday, daysFixtures.planDayMonday),
    ).toEqual({
      day: daysFixtures.expectedDayMonday,
      nodes: nodesFixtures.expectedNodesMonday,
    });
  });
  test("it returns the correct times for scheduling a notification", () => {
    const past = new Date(new Date().getTime() - 1000 * 60 * 65);
    past.setMinutes(0);
    past.setSeconds(0);
    past.setMilliseconds(0);
    const timeObjPast = getTimeObjFromDate(past);
    const expectedTimePast = addDays(past).getTime();

    const future = new Date(new Date().getTime() + 1000 * 60 * 65);
    future.setMinutes(0);
    future.setSeconds(0);
    future.setMilliseconds(0);
    const timeObjFuture = getTimeObjFromDate(future);
    const expectedTimeFuture = future.getTime();

    expect(getNotificationTimeFromTimeObj(timeObjPast)).toEqual(
      expectedTimePast,
    );
    expect(getNotificationTimeFromTimeObj(timeObjFuture)).toEqual(
      expectedTimeFuture,
    );
  });
  it("returns the date formatted for the react-native-calendar", () => {
    const dayId = getDateKey(new Date(2018, 0, 1));
    const ts = new Date(2018, 0, 1).getTime();
    const dateObj = new Date(2018, 0, 1);
    const expectedDateString = "2018-01-01";
    expect(getDateKeyForCal(dayId)).toEqual(expectedDateString);
    expect(getDateKeyForCal(ts)).toEqual(expectedDateString);
    expect(getDateKeyForCal(dateObj)).toEqual(expectedDateString);
  });
});

describe("Days Utilities", () => {
  test("it returns a date key at 00:00:00 for a given date", () => {
    const date = new Date(2017, 1, 1, 1, 1, 1);
    const expectedDateKey = "1485936000000";
    const dateKey = getDateKey(date);
    expect(dateKey).toBe(expectedDateKey);
    expect(typeof dateKey).toBe("string");
  });
  test("it returns a date key at 00:00:00 today if no date given", () => {
    const today = new Date();
    const todayKey = getDateKey();
    const todayKeyDateObj = new Date(parseInt(todayKey));
    expect(today.getDate()).toBe(todayKeyDateObj.getDate());
    expect(typeof todayKey).toBe("string");
  });
  test("it returns an array of dayIds since a given dayId", () => {
    const dayId1 = getDateKey(new Date(2017, 1, 25));
    const dayId2 = getDateKey(new Date(2017, 2, 2));
    const expectedDayIds = [
      getDateKey(new Date(2017, 1, 26)),
      getDateKey(new Date(2017, 1, 27)),
      getDateKey(new Date(2017, 1, 28)),
      getDateKey(new Date(2017, 2, 1)),
      getDateKey(new Date(2017, 2, 2)),
    ];
    expect(getDayIdsBetweenDayIds(dayId1, dayId2)).toEqual(expectedDayIds);
  });
  test("it returns the previous date key for a given date key", () => {
    const dayId = getDateKey(new Date(2017, 1, 25));
    const expectedPrevDateKey = getDateKey(new Date(2017, 1, 24));
    expect(getAdjacentDateKey(dayId, "prev")).toBe(expectedPrevDateKey);
  });
  test("it returns the next date key for a given date key", () => {
    const dayId = getDateKey(new Date(2017, 1, 25));
    const expectedNextDateKey = getDateKey(new Date(2017, 1, 26));
    expect(getAdjacentDateKey(dayId, "next")).toBe(expectedNextDateKey);
  });
  test("it returns a day object without mutating the planDay it's derived from ", () => {
    const nodeIdsArr = nodesFixtures.expectedNodesMonday.map(node => node.id);
    const day = createDayFromPlanDay(
      daysFixtures.dateKeyMonday,
      daysFixtures.planDayMonday,
      nodeIdsArr,
    );
    expect(day).toEqual(daysFixtures.expectedDayMonday);
  });
});

describe("Nodes Utilities", () => {
  test("it returns an array of nodes without mutating the planDay it' derived from ", () => {
    const nodes = createNodesFromPlanDay(
      daysFixtures.dateKeyMonday,
      daysFixtures.planDayMonday,
    );
    expect(nodes).toEqual(nodesFixtures.expectedNodesMonday);
  });
  test("it returns a snack node for a given day and timestamp", () => {
    const snackNode = createSnackNode(
      daysFixtures.dateKeyMonday,
      daysFixtures.snackTimestampMonday,
    );
    expect(snackNode).toEqual(nodesFixtures.expectedSnackNodeMonday);
  });
  it("should return red for a set of nodes with a snack node in it", () => {
    const nodes = [
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.uncheckedTrackedNode,
      nodesFixtures.expectedSnackNodeMonday,
    ];
    const nodeColor = getColorFromNodes(nodes);
    expect(nodeColor).toEqual(Colors.calRed);
  });
  it("should return green for a set of nodes with all completes", () => {
    const nodes = [
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.checkedTrackedNode,
    ];
    const nodeColor = getColorFromNodes(nodes);
    expect(nodeColor).toEqual(Colors.calGreen);
  });
  it("should return yellow for a set with 2/3 completes", () => {
    const nodes = [
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.uncheckedTrackedNode,
    ];
    const nodeColor = getColorFromNodes(nodes);
    expect(nodeColor).toEqual(Colors.calYellow);
  });
  it("should return yellow for a set with 1/3 completes", () => {
    const nodes = [
      nodesFixtures.checkedTrackedNode,
      nodesFixtures.uncheckedTrackedNode,
      nodesFixtures.uncheckedTrackedNode,
    ];
    const nodeColor = getColorFromNodes(nodes);
    expect(nodeColor).toEqual(Colors.calYellow);
  });
});
