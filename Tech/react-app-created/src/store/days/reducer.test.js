import Immutable from 'seamless-immutable';
import { Reducer, Selector } from 'redux-testkit';
import days, { getDayById, getAllDayIds } from './reducer';
import * as daysFixtures from './fixtures';
import * as utilsFixtures from '../../utils/fixtures';
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

    // initial state with Monday added
    const expectedInitialStateWithMonday = {
        daysById: {}
    };
    expectedInitialStateWithMonday.daysById[utilsFixtures.dateKeyMonday]
        = utilsFixtures.expectedDayMonday;

    // sample state with Monday added
    const expectedSampleStateWithMonday = {
        daysById: {
            "123": { id: "123" }
        }
    };
    expectedSampleStateWithMonday.daysById[utilsFixtures.dateKeyMonday]
        = utilsFixtures.expectedDayMonday;

    // sample state with monday with water added
    const expectedStateWaterAdded = {daysById:{}};
    expectedStateWaterAdded.daysById[utilsFixtures.dateKeyMonday]
        = utilsFixtures.expectedDayMondayWithWater;

    // it('should have initial state', () => {
    //     expect(days()).toEqual(daysFixtures.expectedInitialState);
    // });
    // it('should add a new day to the intial days slice of state', () => {
    //     Reducer(days).withState(daysFixtures.expectedInitialState)
    //         .expect(expectedMondayDayAndNodesAddedAction)
    //         .toReturnState(expectedInitialStateWithMonday);
    // });
    // it('should add a new day to a populated days slice of state', () => {
    //     Reducer(days).withState(daysFixtures.stateWithDay)
    //         .expect(expectedMondayDayAndNodesAddedAction)
    //         .toReturnState(expectedSampleStateWithMonday);
    // });
    it('should add a timestamp to the completedTimes of the water prop of the day', () => {
        Reducer(days).withState(expectedInitialStateWithMonday)
            .expect(daysFixtures.expectedWaterAddAction)
            .toReturnState(expectedStateWaterAdded);
    });
    it('should remove a timestamp to the completedTimes of the water prop of the day', () => {
        Reducer(days).withState(expectedStateWaterAdded)
            .expect(daysFixtures.expectedWaterAddAction)
            .toReturnState(expectedInitialStateWithMonday);
    });
});
