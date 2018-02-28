import Immutable from "seamless-immutable";
import { Selector, Reducer } from "redux-testkit";
import nodes, {
  getNodeById,
  getNodesByIds,
  NODE_CHECKED,
  NODE_UNCHECKED,
  SNACK_TAPPED,
  tapNode,
  tapAndHoldNode,
  tapAddSnack,
} from "./reducer";
import * as nodesFixtures from "./fixtures";
import * as daysFixtures from "../days/fixtures";
import { expectedMondayDayAndNodesAddedAction } from "../fixtures";
import { getDateKey } from "../../utils";

describe("nodes Actions", () => {
  it("should dispatch the node checked action", () => {
    expect(tapNode(nodesFixtures.nodeKeyMonday0, 456)).toEqual(
      nodesFixtures.expectedNodeCheckAction,
    );
  });
  it("should dispatch the node uncheck action", () => {
    expect(tapAndHoldNode(nodesFixtures.nodeKeyMonday0, 456)).toEqual(
      nodesFixtures.expectedNodeUnCheckAction,
    );
  });
  it("should dispatch the snack node added action", () => {
    expect(
      tapAddSnack(
        daysFixtures.dateKeyMonday,
        daysFixtures.snackTimestampMonday,
      ),
    ).toEqual(nodesFixtures.expectedSnackTapAction);
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
  it("should add a snack node to the nodes slice of state", () => {
    Reducer(nodes)
      .withState(nodesFixtures.expectedInitialStateWithMonday)
      .expect(nodesFixtures.expectedSnackTapAction)
      .toReturnState(nodesFixtures.expectedStateWithMondayWithSnack);
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
  it("should update today's node when a meal name is edited", () => {
    const initialState = { nodesById: {} };
    const nodeId = `${getDateKey()}_1`;
    initialState.nodesById[nodeId] = { name: "bfast" };
    const immutableInitialState = Immutable.from(initialState);
    const expectedState = Immutable.setIn(
      immutableInitialState,
      ["nodesById", nodeId, "name"],
      "Foofast",
    );
    Reducer(nodes)
      .withState(immutableInitialState)
      .expect(nodesFixtures.expectedNodeUpdatedAction)
      .toReturnState(expectedState);
  });
  it("should update today's node time when a meal time is edited", () => {
    const initialState = { nodesById: {} };
    const nodeId = `${getDateKey()}_1`;
    let nodeTime = new Date();
    nodeTime.setHours(0);
    nodeTime.setMinutes(30);
    nodeTime.setSeconds(0);
    nodeTime.setMilliseconds(0);
    nodeTime = nodeTime.getTime();
    initialState.nodesById[nodeId] = { time: new Date().getTime() };
    const immutableInitialState = Immutable.from(initialState);
    const expectedState = Immutable.setIn(
      immutableInitialState,
      ["nodesById", nodeId, "time"],
      nodeTime,
    );
    Reducer(nodes)
      .withState(immutableInitialState)
      .expect(nodesFixtures.expectedNodeTimeUpdatedAction)
      .toReturnState(expectedState);
  });
  it("should update today's node tracking when a meal's tracking is edited", () => {
    const initialState = { nodesById: {} };
    const nodeId = `${getDateKey()}_1`;
    initialState.nodesById[nodeId] = { tracking: false };
    const immutableInitialState = Immutable.from(initialState);
    const expectedState = Immutable.setIn(
      immutableInitialState,
      ["nodesById", nodeId, "tracking"],
      true,
    );
    Reducer(nodes)
      .withState(immutableInitialState)
      .expect(nodesFixtures.expectedNodeTrackingUpdatedAction)
      .toReturnState(expectedState);
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
        "1486368000000_1486393200000",
        "1486368000000_1486402200000",
        "1486368000000_1486413000000",
        "1486368000000_1486422000000",
        "1486368000000_1486432800000",
      ])
      .toReturn(nodesFixtures.expectedNodesMonday);
  });
  it("should return a single node for a given key", () => {
    Selector(getNodeById)
      .expect(
        nodesFixtures.expectedInitialStateWithMonday,
        "1486368000000_1486393200000",
      )
      .toReturn(nodesFixtures.expectedSingleNode);
  });
});
