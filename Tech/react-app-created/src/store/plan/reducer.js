import Immutable from 'seamless-immutable';
import defaultPlan from './defaultPlan';
import { DAY_SELECTED } from '../uiState/reducer';
import { getDow } from '../../utils/index';

const initialState = Immutable(defaultPlan);

// Reducer
export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case DAY_SELECTED:
            console.log('plan DAY_SELECTED');
            return state;
        default:
            return state;
    }
}

// Selectors
export const getPlanDayByDayId = (state, dayId) => {
    const dateToGet = new Date(parseInt(dayId));
    const dayOfWeek = getDow(dateToGet.getDay());
    return state.days[dayOfWeek];
}
