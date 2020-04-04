// ****************** DUCKS PATTERN ******************
// 1. Reducer phải là default export từ module này.
// 2. Phải export mỗi action creator ra ngoài.

import { createSlice, createSelector } from "@reduxjs/toolkit";

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

/**
 * Dùng createSelector để cache
 * Param nhận 1 hoặc nhiều hàm selector
 * Param cuối là 1 hàm result function
 * Lợi ích của việc cache: Ko tính toán lại nếu input ko đổi + trả về giá trị cũ (memory cũ) nên ko trigger re-render trong React
 */
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(b => !b.resolered) // Nếu bugs, projects ko đổi thì [[bugs.filter(b => !b.resolered)]] ko chạy lại mà lấy từ cache
);

// Selector (1 hàm nhận state => computed state)
// export const getUnresolvedBugs = state =>
//   state.entities.bugs.filter(b => !b.resolved);
