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

// Notifications Plan
/*
  Plan reducer will be responsible for scheduling Notifications and updating
  the scheduling. The notification is scheduled, with a daily interval, and
  an ID is returned. State will have to include the notification IDs so those
  should be added to the plan state.

  https://snack.expo.io/SyChaK8Hb
*/

// Tests
/*
    root
        Actions
            ✔ ensureDaysAndNodes =>
                // ensure days and nodes created since most recent day in daysById
                // for each dayId created, disptach({type: DAY_AND_NODES_ADDED, dayAndNodes})
        Selectors
            ✔ _getDayById => calls days.getDayById with appropriate state slice
            ✔ _getNodeIdByMealIdx(dayId, mealIdx) => returns node id for a given day and mealIdx
            ✔ _getMealByMealIdx(mealIdx) => returns a meal from the plan by mealIdx
        Reducer
    uiState
        Actions
            ✔ selectDay =>
                // tap on day in calendar, navigate with arrows on map screen
                // if necessary, create day and dispatch({type: DAY_AND_NODES_ADDED, dayAndNodes)
                => dispatch({type: DAY_SELECTED, dayId})
            ✔ toggleWaterTracking => dispatch({type: WATER_TRACKING_TOGGLED, BOOLEAN(tracking status)})
            ✔ toggleNotifications => dispatch({type: NOTIFICATIONS_TOGGLED, BOOLEAN(notification status)})
            ✔ completeOnboarding => dispatch({type: ONBOARDING_COMPLETED})
        Selectors
            ✔ getSelectedDayId => return the selected day id || today
            ✔ getWaterTrackingState => return the water tracking state
            ✔ getNotificationsState => return the notification state
            ✔ getOnboardingState => return onboardingComplete state
        Reducer
            ✔ DAY_SELECTED => returns {...uiState, selectedDay: dayId}
            ✔ WATER_TRACKING_TOGGLED => {...uiState, waterTracking: toggleState}
            ✔ NOTIFICATIONS_TOGGLED => {...uiState, notificationTracking: toggleState}
            ✔ ONBOARDING_COMPLETED => {...uiState, onboardingComplete: onboardingCompletedState}
    plan
        Actions
            ✔ editMeal =>
                // check if change is time or tracking. If time or turning off
                // tracking, cancel existing notification and schedule new one;
                // if turning tracking off, just cancel existing; if turning
                // tracking on, scheduled new on
                => dispatch({type: NOTIFICATION_UPDATED, mealIdx, notificaitonId})
                => dispatch({type: MEAL_EDITED, mealIdx, mealObj})
                => dispatch({type: NODE_UPDATED, nodeId, field, value}) <handled by nodes reducer>
        Selectors
            ✔ getPlanDayByDayId => returns a plan day by a dayId
            ✔ getMealByMealIdx => returns a meal from the plan by mealIdx
        Reducer
            ✔ MEAL_EDITED => {...planState, days: newDaysWithUpdatedMeal}
            ✔ NOTIFICATION_UPDATED => {...planState, {...notifications, [mealIdx]: notificationId || null}}
    days
        Actions
            ✔ tapWater => dispatch({type: WATER_ADDED, {dayId: timestamp}})
            ✔ tapAndHoldWater => dispatch({type: WATER_REMOVED, {dayId: timestamp}})
            ✔ editWeight => dispatch({type: WEIGHT_EDITED, dayId, weight})
        Selectors
            ✔ getDayById(dayId) => returns a day or undefined
            ✔ getDayIds() => returns all the day ids
            ✔ getMinDate() => returns the minimum date in state
            ✔ getAllDayIdsInOrder => returns array of ordered dayIds in ASC order
        Reducer
            ✔ DAY_AND_NODES_ADDED => {...daysState, {...daysById, [dayId]: newDay}}
            ✔ WATER_ADDED => returns {...daysState, daysById[dayId]: {...day, water_completes: [timestamp added]}}
            ✔ WATER_REMOVED => returns {...daysState, daysById[dayId]: {...day, water_completes: [timestamp removed]}}
            ✔ NODE_ADDED => {...daysState, daysById[dayId]: {...day, nodeIds: {...nodeIds, [nodeId]: newNode}}}
            ✔ NODE_UNCHECKED => {...daysState, daysById[dayId]: {...day, nodeIds: {...nodeIds (minus snack node id)}}}
            ✔ WEIGHT_EDITED => {...daysState, daysById[dayId]: {...day, weight}}
    nodes
        Actions
            ✔ tapNode(nodeId) => dispatch({type: NODE_CHECKED, nodeId, timestamp})
            ✔ tapAndHoldNode(nodeId) => dispatch({type: SNACK_NODE_UNCHECKED, nodeId, timestamp})
            ✔ tapAddSnack(dayId, timestamp) =>
                // create new snack node createSnackNode(dayId, timestamp)
                => dispatch({type: NODE_ADDED, snackNode})
            ✔ editSnackTime(snackId, timestamp) =>
                // update snack node with new time
                => dispatch({type: SNACK_NODE_UNCHECKED, nodeId, timestamp})
                => dispatch({type: NODE_ADDED, snackNode})
        Selectors
            ✔ getNodeById(nodeId) => returns the requested node or undefined if it doesn't exist
            ✔ getNodesByIds([nodeIds]) => returns array of the requeted nodes
        Reducer
            ✔ DAY_AND_NODES_ADDED => {...nodesState, {...nodesById, [[nodeId]: newNode...]}
            ✔ NODE_CHECKED => {...nodesState, {...nodesById, [nodeId]: {...node, compltedTime: timestamp}}}
            ✔ NODE_UNCHECKED => {...nodesState, {...nodesById, [nodeId]: {...node, compltedTime: null}}}
            ✔ SNACK_NODE_UNCHECKED {...nodesState (without snack node)}
            ✔ NODE_ADDED => {...nodesState, {...nodedById, [nodeId]: snackNode}}}
            ✔ NODE_UPDATED => {...nodesState, {...nodesById, [nodeId]: editedNode}
*/

// Utilities
/*
  ✔ getDow => return string for javascript day
  ✔ getMonth => return string for javascript month
  ✔ getTimestampFromTimeObj => returns a timestamp from a plan day time obj
  ✔ createDayAndNodes => returns a day object and nodes for a dayId from a given planDay
  plan
    ? cancelNotificationAsync => cancels a notification, returns ?
    ? scheduleNotificationAsycn => schedules notification, returns ID
  days
    ✔ getDateKey => return a date's 00:00:00 timestamp
    ✔ createDayFromPlanDay => returns a day object from a plan day
    ✔ getDayIdsBetweenDayIds => returns an array of dayIds between the dates
  nodes
    ✔ createNodesFromPlanDay => returns an array of nodes from a plan day
    ✔ createSnackNode => returns a node object for a given dayId and timestamp
    ✔ getColorFromNodes => returns the color for a set of nodes
    ? getNodeKey => return the dateKey_nodePositionIndex
    ? getCurrentNode => return the node that should be highlighted
    ? getNodeEndBoundaryTime => return the time the node becomes 'missed'
    ✔ getFriendlyNodeTime => return the cute time
    (sortNodes - not needed since day.nodes is an array with the id in the correct order)
    (getNodeTime - not needed since node time will be timestamp)
*/

// State Shape
/*
  uiState: {
    selectedDay: dayId,
    notifications: true || false,
    waterTracking: true || false,
    weightTracking: true || false,
    onboardingComplete: true || false,
  }
  plan: {
    notifications: [
      [mealIdx]: notificationId || null (if tracking is false)
    ],
    days: [
      [dayKey = day name (eg monday)]: {
        nodes: [
          {
            name: 'Bfast',
            time: {
              hours: 7,
              minutes: null
            },
            items: [items...],
            tracking: true || false
          }
        ],
        water_target: 8,
        weight: 123.4
      }
    ],
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
    nodesById: {
      [nodeKey = dayKey_timestamp]: {
        type: 'plan' || 'offplan'
        name: 'bfast',
        time: timestamp,
        items: [items...],
        completedTime: actual timestamp,
        tracking: true || false
      }
    }
  }
*/
