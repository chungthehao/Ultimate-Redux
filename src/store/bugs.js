// ****************** DUCKS PATTERN ******************
// 1. Reducer phải là default export từ module này.
// 2. Phải export mỗi action creator ra ngoài.

import { createSlice, createSelector } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs) => {
      bugs.loading = false;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        resolved: false,
        description: action.payload.description,
      });
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(index, 1);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignedToUser: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.list.findIndex((b) => b.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

/**
 * Action creators
 */
const url = "/bugs";

export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type, // type action mà sẽ dispatch khi api này resolved
    onError: bugsRequestFailed.type, // type action mà sẽ dispatch khi api này bị rejected
  });

/**
 * Dùng createSelector để cache
 * Param nhận 1 hoặc nhiều hàm selector
 * Param cuối là 1 hàm result function
 * Lợi ích của việc cache: Ko tính toán lại nếu input ko đổi + trả về giá trị cũ (memory cũ) nên ko trigger re-render trong React
 */
const getBugs = (state) => state.entities.bugs;

export const getUnresolvedBugs = createSelector(
  getBugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((b) => !b.resolered) // Nếu bugs, projects ko đổi thì [[bugs.filter(b => !b.resolered)]] ko chạy lại mà lấy từ cache
);

export const getBugsByUser = (userId) =>
  createSelector(getBugs, (bugs) => bugs.filter((b) => b.userId === userId));

// Selector (1 hàm nhận state => computed state)
// export const getUnresolvedBugs = state =>
//   state.entities.bugs.filter(b => !b.resolved);
