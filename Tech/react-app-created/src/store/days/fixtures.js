import Immutable from 'seamless-immutable';
import { WATER_ADDED, WATER_REMOVED } from './reducer';
import { dateKeyMonday, expectedDayMonday } from '../../utils/fixtures';

export const expectedInitialState = Immutable({
    daysById: {}
});

export const sampleDay = Immutable({
    id: "123"
});

export const stateWithDay = Immutable({
    daysById: {
        "123": sampleDay
    }
});

export const expectedWaterAddAction = {
    type: WATER_ADDED,
    dayId: dateKeyMonday,
    time: "456"
}

export const expectedWaterRemoveAction = {
    type: WATER_ADDED,
    dayId: dateKeyMonday,
    time: "456"
}
