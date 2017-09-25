import Immutable from 'seamless-immutable';
import { _getDayById } from '../reducer';
import { getDateKey } from '../../utils';

// Action Types
export const DAY_SELECTED = 'day_selected';

// Actions
export const selectDay = (dayId = getDateKey()) => ({type: DAY_SELECTED, dayId})

// Reducer
const initialState = Immutable({
    selectedDayId: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case DAY_SELECTED:
            return {...state, selectedDayId: action.dayId}
        default: return state;
    }
}

// Selectors
export const getSelectedDayId = state => state.selectedDayId;
