// init app
/*
    show loading
    configureStore runs
        -> creates store
        -> subscribes to store to save state
        -> ensures days are created & dispatches DAY_AND_NODES_ADDED
    map screen renders

    // TODO: handle app running when new day starts (use clock to kick off
    day and node addition)
*/

// show map

// handle node taps

// handle water taps

// Tests
/*
    root
        Actions
            ✔ ensureDaysAndNodes =>
                // ensure days and nodes created since most recent day in daysById
                // for each dayId created, disptach({type: DAY_AND_NODES_ADDED, dayAndNodes})
        Selectors
            ✔ _getDayById => calls days.getDayById with appropriate state slice
        Reducer
    uiState
        Actions
            ✔ selectDay =>
                // tap on day in calendar, navigate with arrows on map screen
                // dispatch({type: DAY_SELECTED, dayId})
        Selectors
            ✔ getSelectedDayId => return the selected day id || undefined
        Reducer
            ✔ DAY_SELECTED => returns {...uiState, selectedDay: dayId}
    plan
        Actions
        Selectors
        Reducer
    days
        Actions
            tapWater => dispatch({type: WATER_ADDED, {dayId: timestamp}})
            tapAndHoldWater => dispatch({type: WATER_REMOVED, {dayId: timestamp}})
        Selectors
            ✔ getDayById(dayId) => returns a day or undefined
            ✔ getDayIds() => returns all the day ids
        Reducer
            DAY_AND_NODES_ADDED => {...daysState, {...daysById, [dayId]: newDay}}
            WATER_ADDED => returns {...daysState, daysById[dayId]: {...day, water_completes: [timestamp added]}}
            WATER_REMOVED => returns {...daysState, daysById[dayId]: {...day, water_completes: [timestamp removed]}}
    nodes
        Actions
            tapNode(nodeId) => dispatch({type: NODE_CHECKED, nodeId})
            tapAndHoldNode(nodeId) => dispatch({type: NODE_UNCHECKED, nodeId})
        Selectors
            getNodesByIds([nodeIds]) => returns the requested nodes, in the order requested
        Reducer
            DAY_AND_NODES_ADDED => {...nodesState, [[newNodeId]: newNode}...]}
            NODE_CHECKED => {...nodesState, [nodeId]: {...node, compltedTime: timestamp}}
            NODE_UNCHECKED => {...nodesState, [nodeId]: {...node, compltedTime: null}}
*/

// Utilities
/*
    ✔ getDow => return string for javascript day
    ✔ getMonth => return string for javascript month
    ✔ getTimestampFromTimeObj => returns a timestamp from a plan day time obj
    ✔ createDayAndNodes => returns a day object and nodes for a dayId from a given planDay
    plan
    days
        ✔ getDateKey => return a date's 00:00:00 timestamp
        ✔ createDayFromPlanDay => returns a day object from a plan day
        ✔ getDayIdsBetweenDayIds => returns an array of dayIds between the dates
    nodes
        ✔ createNodesFromPlanDay => returns an array of nodes from a plan day
        ? getNodeKey => return the dateKey_nodePositionIndex
        ? getCurrentNode => return the node that should be highlighted
        ? getNodeEndBoundaryTime => return the time the node becomes 'missed'
        ? getFriendlyNodeTime => return the cute time
        (sortNodes - not needed since day.nodes is an array with the id in the correct order)
        (getNodeTime - not needed since node time will be timestamp)
*/

// State Shape
/*
    uiState: {
        selectedDay: dayId
    }
    plan: {
        days: [
            [dayKey = day name (eg monday)]: {
                nodes: [
                    {
                        name: 'Bfast',
                        time: {
                            hours: 7,
                            minutes: null
                        },
                        items: [items...]
                    }
                ],
                water_target: 8
            }
        ]
    }
    days: {
        daysById: {
            [dayKey = timestamp at 00:00:00]: {
                water: {
                    completedTimes: [timestamps...],
                    target: 8
                },
                nodesIds: [nodeIds...],
                offPlanNodeIds: [nodeIds...]
            }
        }
    }
    nodes: {
        [nodeKey = dayKey_nodePositionIndex]: {
            name: 'bfast',
            time: timestamp,
            items: [items...],
            completedTime: timestamp
        }
    }
*/
