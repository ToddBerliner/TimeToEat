import Immutable from 'seamless-immutable';
import { Reducer, Selector } from 'redux-testkit';
import * as uiStateFixtures from './fixtures';
import * as rootFixtures from '../fixtures';
import uiState, { DAY_SELECTED, selectDay, getSelectedDayId } from './reducer';

const rootState = rootFixtures.expectedInitialState;

describe('uiState Actions', () => {
    // test action if day doesnt exist
    // test action if day exists
    it('should dispatch the day selected action with the dayId', () => {
        expect(selectDay("123")).toEqual({
            type: DAY_SELECTED,
            dayId: "123"
        })
    });
});

describe('uiState Selectors', () => {
    it('should return undefined if no day is selected', () => {
        Selector(getSelectedDayId).expect(uiStateFixtures.expectedInitialState)
        .toReturn(undefined);
    });
    const selectedDayState =
        uiStateFixtures.expectedInitialState.set("selectedDayId", "123");
    it('should return a dayId if one is selected', () => {
        Selector(getSelectedDayId).expect(selectedDayState).toReturn("123");
    });
});

describe('uiState Reducer', () => {
    it('should have default state', () => {
        expect(uiState()).toEqual(uiStateFixtures.expectedInitialState);
    });
    it('should ignore uninteresting action types', () => {
        Reducer(uiState).expect({type: 'INTERESTED_NOT'})
            .toReturnState(uiStateFixtures.expectedInitialState);
    });
    it('should return new state with selectedDay set', () => {
        const dayId = "123";
        const expectedState = {
            selectedDayId: "123"
        };
        Reducer(uiState).expect({type: DAY_SELECTED, dayId})
            .toReturnState(expectedState);
    });
});
