import Immutable from 'seamless-immutable';
import { Selector, Reducer } from 'redux-testkit';
import nodes, { getNodesByIds, NODE_CHECKED, NODE_UNCHECKED,
    tapNode, tapAndHoldNode } from './reducer';
import * as nodesFixtures from './fixtures';

describe('nodes Reducer', () => {

    // state with expectedMondayNodes added
    const expectedStateWithMondayNodesAdded

    it('should have initial state', () => {
        expect(nodes()).toEqual(nodesFixtures.expectedInitialState);
    });
    it('should add new nodes to the nodesById slice of state', () => {

    });
});
