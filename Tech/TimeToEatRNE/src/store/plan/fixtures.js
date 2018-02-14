import Immutable from "seamless-immutable";
import defaultPlan from "./defaultPlan";

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
    },
    {
      name: "Midmorning Snack",
      time: {
        hours: 9,
        minutes: 30,
      },
      items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
    },
    {
      name: "Lunch",
      time: {
        hours: 12,
        minutes: 30,
      },
      items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
    },
    {
      name: "Afternoon Snack",
      time: {
        hours: 15,
        minutes: 0,
      },
      items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
    },
    {
      name: "Dinner",
      time: {
        hours: 18,
        minutes: 0,
      },
      items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
    },
  ],
  waterTarget: 8,
};
