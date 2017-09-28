import Immutable from "seamless-immutable";
import { dateKeyMonday } from "../days/fixtures";
import { NODE_CHECKED, NODE_UNCHECKED } from "./reducer";

export const expectedInitialState = Immutable({
    nodesById: {}
});
export const expectedInitialStateWithMonday = Immutable({
    nodesById: {
        "1486368000000_0": {
            id: `${dateKeyMonday}_0`,
            name: "Breakfast",
            time: 1486393200000,
            items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
            completedTime: null
        },
        "1486368000000_1": {
            id: `${dateKeyMonday}_1`,
            name: "Midmorning Snack",
            time: 1486402200000,
            items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
            completedTime: null
        },
        "1486368000000_2": {
            id: `${dateKeyMonday}_2`,
            name: "Lunch",
            time: 1486413000000,
            items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
            completedTime: null
        },
        "1486368000000_3": {
            id: `${dateKeyMonday}_3`,
            name: "Afternoon Snack",
            time: 1486422000000,
            items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
            completedTime: null
        },
        "1486368000000_4": {
            id: `${dateKeyMonday}_4`,
            name: "Dinner",
            time: 1486432800000,
            items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
            completedTime: null
        }
    }
});
export const nodeKeyMonday0 = `${dateKeyMonday}_0`;
export const expectedSingleNode = Immutable({
    id: `${dateKeyMonday}_0`,
    name: "Breakfast",
    time: 1486393200000,
    items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
    completedTime: null
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
export const expectedNodeCheckAction = {
    type: NODE_CHECKED,
    nodeId: nodeKeyMonday0,
    time: 456
};
export const expectedNodeUnCheckAction = {
    type: NODE_UNCHECKED,
    nodeId: nodeKeyMonday0,
    time: 456
};
export const expectedStateNodeChecked = Immutable({
    nodesById: {
        "1486368000000_0": {
            id: `${dateKeyMonday}_0`,
            name: "Breakfast",
            time: 1486393200000,
            items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
            completedTime: 456
        }
    }
});
export const expectedStateNodeUnChecked = Immutable({
    nodesById: {
        "1486368000000_0": {
            id: `${dateKeyMonday}_0`,
            name: "Breakfast",
            time: 1486393200000,
            items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
            completedTime: null
        }
    }
});
