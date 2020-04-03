// ****************** DUCKS PATTERN ******************
// 1. Reducer phải là default export từ module này.
// 2. Phải export mỗi action creator ra ngoài.

/**
 * Action Types
 */
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

/**
 * Action Creators
 */
export const bugAdded = description => ({
  type: BUG_ADDED,
  payload: {
    description
  }
});

export const bugRemoved = id => ({
  type: BUG_REMOVED,
  payload: {
    id
  }
});

export const bugResolved = id => ({
  type: BUG_RESOLVED,
  payload: {
    id
  }
});

/**
 * Reducer
 */
let lastId = 0;
// Reducer in Redux have to be a pure function.
export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          resolved: false,
          description: action.payload.description
        }
      ];

    case BUG_REMOVED:
      return state.filter(bug => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map(bug =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
