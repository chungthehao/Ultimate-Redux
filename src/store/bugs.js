// ****************** DUCKS PATTERN ******************
// 1. Reducer phải là default export từ module này.
// 2. Phải export mỗi action creator ra ngoài.

import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        resolved: false,
        description: action.payload.description
      });
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs.splice(index, 1);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    }
  }
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

// Selector (1 hàm nhận state => computed state)
export const getUnresolvedBugs = state =>
  state.entities.bugs.filter(b => !b.resolved);
