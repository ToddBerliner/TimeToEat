import Immutable from "seamless-immutable";
import defaultPlan from "./defaultPlan";
import { getDow, DOW, getDateKey } from "../../utils";
import { _getNodeIdByDayIdAndMealIdx } from "../reducer";
import { NODE_UPDATED } from "../nodes/reducer";

// Action Types & Constants
export const MEAL_EDITED = "meal_edited";

// Actions
export const editMeal = (mealIdx, field, value) => {
  return function(dispatch, getState) {
    dispatch({
      type: MEAL_EDITED,
      mealIdx,
      field,
      value,
    });
    // get node id
    const nodeId = _getNodeIdByDayIdAndMealIdx(
      getState(),
      getDateKey(),
      mealIdx,
    );
    if (nodeId) {
      dispatch({
        type: NODE_UPDATED,
        nodeId: nodeId,
        field,
        value,
      });
    }
  };
};

// Reducer
const initialState = Immutable(defaultPlan);

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case MEAL_EDITED:
      const newState = Immutable.asMutable(state, { deep: true });
      const { mealIdx, field, value } = action;
      DOW.forEach(day => (newState.days[day].nodes[mealIdx][field] = value));
      return Immutable(newState);
    default:
      return state;
  }
}

// Selectors
export const getPlanDayByDayId = (state, dayId) => {
  const dateToGet = new Date(parseInt(dayId, 10));
  const dayOfWeek = getDow(dateToGet.getDay());
  return state.days[dayOfWeek];
};
