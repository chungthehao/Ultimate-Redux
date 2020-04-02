import * as actions from "./actionTypes";

let lastId = 0;

// Reducer in Redux have to be a pure function.
export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          resolved: false,
          description: action.payload.description
        }
      ];

    case actions.BUG_REMOVED:
      return state.filter(bug => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map(bug =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
