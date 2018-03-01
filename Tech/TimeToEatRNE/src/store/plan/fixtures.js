import Immutable from "seamless-immutable";
import defaultPlan from "./defaultPlan";
import { MEAL_EDITED, NOTIFICATION_UPDATED } from "./reducer";

export const expectedInitialState = Immutable(defaultPlan);

export const expectedStateWithNotificationIds = Immutable.set(
  expectedInitialState,
  "notifications",
  [null, "123", null, null, null],
);

export const expectedMeal0 = {
  name: "Breakfast",
  time: {
    hours: 7,
    minutes: 0,
  },
  items: ["Eggs", "Fruit", "Avocado", "Greek Yogurt"],
  tracking: false,
};

export const expectedPlanDayWednesday = {
  dayOfWeek: "Wednesday",
  nodes: [
    expectedMeal0,
    {
      name: "Midmorning Snack",
      time: {
        hours: 9,
        minutes: 30,
      },
      items: ["Banana", "Cottage Cheese & Fruit", "Protien Snack Bar"],
      tracking: false,
    },
    {
      name: "Lunch",
      time: {
        hours: 12,
        minutes: 30,
      },
      items: ["Canned Tuna", "Green Salad", "Whole Wheat Bread", "Fruit"],
      tracking: false,
    },
    {
      name: "Afternoon Snack",
      time: {
        hours: 15,
        minutes: 0,
      },
      items: ["Fruit & Nuts Mix", "Cheese Stick", "Low Fat Muffin"],
      tracking: false,
    },
    {
      name: "Dinner",
      time: {
        hours: 18,
        minutes: 0,
      },
      items: ["Lean Protien", "Lots of Veggies", "Quinoa"],
      tracking: false,
    },
  ],
  waterTarget: 8,
};

export const mealEditedNameAction = {
  type: MEAL_EDITED,
  mealIdx: 1,
  field: "name",
  value: "Foofast",
};

export const mealEditedTimeAction = {
  type: MEAL_EDITED,
  mealIdx: 1,
  field: "time",
  value: { hours: 0, minutes: 30 },
};

export const mealEditedTrackingAction = {
  type: MEAL_EDITED,
  mealIdx: 1,
  field: "tracking",
  value: false,
};

export const mealEditedNotificationAction = {
  type: NOTIFICATION_UPDATED,
  mealIdx: 1,
  notificationId: "123",
};

export const mealEditedNotificationOffAction = {
  type: NOTIFICATION_UPDATED,
  mealIdx: 1,
  notificationId: null,
};
