import Immutable from "seamless-immutable";
import { getDateKey } from "../../utils";

// Action Types
export const DAY_SELECTED = "day_selected";

// Actions
export const selectDay = (dayId = getDateKey()) => ({
  type: DAY_SELECTED,
  dayId
});

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
