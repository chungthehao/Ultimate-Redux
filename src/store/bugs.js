// ****************** DUCKS PATTERN ******************
// 1. Reducer phải là default export từ module này.
// 2. Phải export mỗi action creator ra ngoài.

import { createAction } from "@reduxjs/toolkit";

// const hamTaoLao = createAction("ABC"); // type -> 'ABC'
// console.log(hamTaoLao({ id: 321 })); // { type: 'ABC', payload: { id: 321 } }
// console.log(hamTaoLao.type); // ABC
// console.log(hamTaoLao.toString()); // ABC

/**
 * Action Creators
 */
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

/**
 * Reducer
 */
let lastId = 0;
// Reducer in Redux have to be a pure function.
export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          resolved: false,
          description: action.payload.description
        }
      ];

    case bugRemoved.type:
      return state.filter(bug => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map(bug =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
