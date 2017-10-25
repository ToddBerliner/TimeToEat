import Immutable from "seamless-immutable";
import { getDateKey, getDateFromKey, createDayAndNodes } from "../../utils";
import { _getDayById, DAY_AND_NODES_ADDED } from "../reducer";
import { getPlanDayByDayId } from "../plan/reducer";

// Action Types
export const DAY_SELECTED = "day_selected";

// Actions
export const selectDay = (dayId = getDateKey()) => {
  return function(dispatch, getState) {
    // check for existing day
    if (_getDayById(getState(), dayId) === undefined) {
      // create the day and dispatch the DAY_AND_NODES_ADDED action
      const planDay = getPlanDayByDayId(getState().plan, dayId);
      const dayAndNodes = createDayAndNodes(dayId, planDay);
      dispatch({ type: DAY_AND_NODES_ADDED, dayAndNodes });
    }
    // once day is created, dispatch the DAY_SELECTED
    dispatch({ type: DAY_SELECTED, dayId });
  };
};

// Reducer
const initialState = Immutable({
  selectedDayId: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case DAY_SELECTED:
      return Immutable({ ...state, selectedDayId: action.dayId });
    default:
      return state;
  }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId || getDateKey();
