import Immutable from "seamless-immutable";
import { Selector, Reducer } from "redux-testkit";
import nodes, {
  getNodeById,
  getNodesByIds,
  NODE_CHECKED,
  NODE_UNCHECKED,
  tapNode,
  tapAndHoldNode
} from "./reducer";
import * as nodesFixtures from "./fixtures";
import { expectedMondayDayAndNodesAddedAction } from "../fixtures";

describe("nodes Actions", () => {
  it("should dispatch the node checked action", () => {
    expect(tapNode(nodesFixtures.nodeKeyMonday0, 456)).toEqual(
      nodesFixtures.expectedNodeCheckAction
    );
  });
  it("should dispatch the node uncheck action", () => {
    expect(tapAndHoldNode(nodesFixtures.nodeKeyMonday0, 456)).toEqual(
      nodesFixtures.expectedNodeUnCheckAction
    );
  });
});

describe("nodes Reducer", () => {
  it("should have initial state", () => {
    expect(nodes()).toEqual(nodesFixtures.expectedInitialState);
  });
  it("should add nodes to the nodes slice of state", () => {
    Reducer(nodes)
      .withState(nodesFixtures.expectedInitialState)
      .expect(expectedMondayDayAndNodesAddedAction)
      .toReturnState(nodesFixtures.expectedInitialStateWithMonday);
  });
  it("should set the completed time of an unchecked node", () => {
    Reducer(nodes)
      .withState(nodesFixtures.expectedStateNodeUnChecked)
      .expect(nodesFixtures.expectedNodeCheckAction)
      .toReturnState(nodesFixtures.expectedStateNodeChecked);
  });
  it("should unset the completed time of a checked node", () => {
    Reducer(nodes)
      .withState(nodesFixtures.expectedStateNodeChecked)
      .expect(nodesFixtures.expectedNodeUnCheckAction)
      .toReturnState(nodesFixtures.expectedStateNodeUnChecked);
  });
});

describe("nodes Selectors", () => {
  it("should return undefined if a requested node keys don't exist", () => {
    Selector(getNodesByIds)
      .expect(nodesFixtures.expectedInitialState, ["abc"])
      .toReturn([undefined]);
  });
  it("should return the requested nodes for existing keys", () => {
    Selector(getNodesByIds)
      .expect(nodesFixtures.expectedInitialStateWithMonday, [
        "1486368000000_0",
        "1486368000000_1",
        "1486368000000_2",
        "1486368000000_3",
        "1486368000000_4"
      ])
      .toReturn(nodesFixtures.expectedNodesMonday);
  });
  it("should return a single node for a given key", () => {
    Selector(getNodeById)
      .expect(nodesFixtures.expectedInitialStateWithMonday, "1486368000000_0")
      .toReturn(nodesFixtures.expectedSingleNode);
  });
});
