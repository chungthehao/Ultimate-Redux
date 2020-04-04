import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name
      });
    }
  }
});

// Dùng slice thì nó tự tạo ra action creator dựa vào key
export const { projectAdded } = slice.actions;
export default slice.reducer;
