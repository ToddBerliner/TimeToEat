import Immutable from 'seamless-immutable';
import { _getDayById } from '../reducer';
import { getDateKey } from '../../utils';

// action type
export const DAY_SELECTED = 'day_selected';

// actions
export const selectDay = (dayId = getDateKey()) => ({type: DAY_SELECTED, dayId})

// reducer
const initialState = Immutable({
    selectedDayId: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case DAY_SELECTED:
            // console.log(_getDayById(action.dayId));
            // return state.set("selectedDay", action.dayId);
            return {...state, selectedDayId: action.dayId}
        default: return state;
    }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId;
