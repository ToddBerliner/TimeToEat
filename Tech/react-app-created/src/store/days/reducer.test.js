import Immutable from 'seamless-immutable';
import { Reducer, Selector } from 'redux-testkit';
import days, { getDayById, getAllDayIds } from './reducer';
import * as daysFixtures from './fixtures';
import { expectedMondayDayAndNodesAddedAction } from '../fixtures';

describe('days Selectors', () => {
    it('should return undefined if selected day doesn\'t exist', () => {
        Selector(getDayById)
            .expect(daysFixtures.expectedInitialState, "abc")
            .toReturn(undefined);
    });
    it('should return the selected day for the given dayId', () => {
        Selector(getDayById)
            .expect(daysFixtures.stateWithDay, "123")
            .toReturn(daysFixtures.sampleDay);
    });
    it('should return and empty array from the initial state which has no days', () => {
        Selector(getAllDayIds)
            .expect(daysFixtures.expectedInitialState).toReturn([]);
    });
    it('should return the keys of the days piece of state which are the dayIds', () => {
        Selector(getAllDayIds)
            .expect(daysFixtures.stateWithDay).toReturn(["123"]);
    });
});

describe('days Reducer', () => {
    it('should have initial state', () => {
        expect(days()).toEqual(daysFixtures.expectedInitialState);
    });
    // it('should add a new day to the intial days slice of state', () => {
    //     Reducer(days).withState(expectedInitialState)
    //         .expect(expectedMondayDayAndNodesAddedAction)
    //         .toReturnState(expectedInitialStateWithMonday);
    // });
    // it('should add a new day to a populated days slice of state', () => {
    //     Reducer(days).withState(stateWithDay)
    //         .expect(expectedMondayDayAndNodesAddedAction)
    //         .toReturnState(expectedSampleStateWithMonday);
    // });
});
