import Immutable from "seamless-immutable";
import defaultPlan from "./defaultPlan";
import { MEAL_EDITED } from "./reducer";

export const expectedInitialState = Immutable(defaultPlan);

export const expectedPlanDayWednesday = {
  dayOfWeek: "Wednesday",
  nodes: [
    {
      name: "Breakfast",
      time: {
        hours: 7,
        minutes: 0,
      },
      items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
      tracking: true,
    },
    {
      name: "Midmorning Snack",
      time: {
        hours: 9,
        minutes: 30,
      },
      items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
      tracking: true,
    },
    {
      name: "Lunch",
      time: {
        hours: 12,
        minutes: 30,
      },
      items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
      tracking: true,
    },
    {
      name: "Afternoon Snack",
      time: {
        hours: 15,
        minutes: 0,
      },
      items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
      tracking: true,
    },
    {
      name: "Dinner",
      time: {
        hours: 18,
        minutes: 0,
      },
      items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
      tracking: true,
    },
  ],
  waterTarget: 8,
};

export const mealEditedAction = {
  type: MEAL_EDITED,
  mealIdx: 1,
  field: "name",
  value: "Foofast",
};
