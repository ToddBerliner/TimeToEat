import Immutable from 'seamless-immutable';

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
