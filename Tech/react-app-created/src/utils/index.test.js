import {
    getDow,
    getMonth,
    getDateKey,
    getYesterdayDateKey,
    createDayFromPlanDay,
    createNodesFromPlanDay,
    getTimestampFromTimeObj,
    getDayIdsBetweenDayIds,
    createDayAndNodes
} from "./";
import * as daysFixtures from "../store/days/fixtures";
import * as nodesFixtures from "../store/nodes/fixtures";

describe("Generic Utilities", () => {
    test("it returns the day of the week for the given index or null", () => {
        expect(getDow(0)).toBe("sunday");
        expect(getDow(7)).toBeNull();
        expect(getDow()).toBeNull();
    });
    test("it returns the month for the given index or null", () => {
        expect(getMonth(0)).toBe("january");
        expect(getMonth(12)).toBeNull();
        expect(getMonth()).toBeNull();
    });
    test("it returns a timestamp for a given day and plan node time object", () => {
        const dateKey = getDateKey(new Date(2017, 1, 1));
        const timeObj = {
            hours: 4,
            minutes: 30
        };
        const timestamp = getTimestampFromTimeObj(dateKey, timeObj);
        expect(timestamp).toBe(1485952200000);
    });
    test("it returns a dayAndNodes object for a given dateKey", () => {
        expect(
            createDayAndNodes(
                daysFixtures.dateKeyMonday,
                daysFixtures.planDayMonday
            )
        ).toEqual({
            day: daysFixtures.expectedDayMonday,
            nodes: nodesFixtures.expectedNodesMonday
        });
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
            getDateKey(new Date(2017, 2, 2))
        ];
        expect(getDayIdsBetweenDayIds(dayId1, dayId2)).toEqual(expectedDayIds);
    });
    test("it returns a day object without mutating the planDay it's derived from ", () => {
        const nodeIdsArr = nodesFixtures.expectedNodesMonday.map(
            node => node.id
        );
        const day = createDayFromPlanDay(
            daysFixtures.dateKeyMonday,
            daysFixtures.planDayMonday,
            nodeIdsArr
        );
        expect(day).toEqual(daysFixtures.expectedDayMonday);
    });
});

describe("Nodes Utilities", () => {
    test("it returns an array of nodes without mutating the planDay it' derived from ", () => {
        const nodes = createNodesFromPlanDay(
            daysFixtures.dateKeyMonday,
            daysFixtures.planDayMonday
        );
        expect(nodes).toEqual(nodesFixtures.expectedNodesMonday);
    });
});
