import { DOW } from "../../utils";

// utility to build a day for plan.days
export const buildDay = dayOfWeek => ({
  dayOfWeek,
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
});

// function to build initial state by filling plan.days property
const buildDefaultPlanState = () => {
  // define initial state
  const defaultPlanState = {
    days: {},
  };
  DOW.forEach(day => {
    defaultPlanState.days[day] = buildDay(day);
  });
  return defaultPlanState;
};

export default buildDefaultPlanState();
