import { addBug } from "../bugs";
import configureStore from "../configureStore";

/**
 * Social test (chỉ xem tổng thể behavior, ko xem xét chi tiết)
 */
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    // dispatch(addBug(bugData)) => then, look at our store
    const store = configureStore();
    const { dispatch, getState } = store;
    const bug = { description: "a" };

    await dispatch(addBug(bug));
    console.log("MY BUG LIST", getState().entities.bugs.list);

    expect(getState().entities.bugs.list).toHaveLength(1);
  });
});

/**
 * Demo solitary test (chi tiết đến cách thức vận hành của từng bộ phận)
 */
// import { addBug, bugAdded } from "../bugs";
// import { apiCallBegan } from "../api";

// describe("bugsSlice", () => {
//   describe("action creators", () => {
//     // Mục đích test riêng lẻ action creator addBug này
//     it("addBug", () => {
//       const bug = { description: "a" };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: "/bugs",
//           method: "post",
//           data: bug,
//           onSuccess: bugAdded.type,
//         },
//       };

//       expect(result).toEqual(expected);
//     });
//   });
// });
