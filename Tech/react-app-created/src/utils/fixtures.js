import Immutable from 'seamless-immutable';
import defaultPlan from '../store/plan/defaultPlan';
import { getDateKey } from './';

export const planDayMonday = Immutable(defaultPlan.days.monday);
export const dateKeySunday = getDateKey(new Date(2017, 1, 5));
export const dateKeyMonday = getDateKey(new Date(2017, 1, 6));
export const dateKeyWednesday = getDateKey(new Date(2017, 1, 8));
export const expectedNodesMonday = [
    {
        id: `${dateKeyMonday}_0`,
        name: "Breakfast",
        time: 1486393200000,
        items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
        completedTime: null
    },
    {
        id: `${dateKeyMonday}_1`,
        name: "Midmorning Snack",
        time: 1486402200000,
        items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
        completedTime: null
    },
    {
        id: `${dateKeyMonday}_2`,
        name: "Lunch",
        time: 1486413000000,
        items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
        completedTime: null
    },
    {
        id: `${dateKeyMonday}_3`,
        name: "Afternoon Snack",
        time: 1486422000000,
        items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
        completedTime: null
    },
    {
        id: `${dateKeyMonday}_4`,
        name: "Dinner",
        time: 1486432800000,
        items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
        completedTime: null
    }
];
export const expectedDayMonday = {
    id: dateKeyMonday,
    water: {
        completedTimes: [],
        target: 8
    },
    nodeIds: ["1486368000000_0", "1486368000000_1", "1486368000000_2",
        "1486368000000_3", "1486368000000_4"],
    offPlanNodeIds: []
}
