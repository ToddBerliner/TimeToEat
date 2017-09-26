import Immutable from 'seamless-immutable';
import { dateKeyMonday } from '../days/fixtures';

export const expectedInitialState = Immutable({
    nodesById: {}
});
export const expectedNodesMonday = Immutable([
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
]);
