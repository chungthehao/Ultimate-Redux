import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { addBug, getUnresolvedBugs, resolveBug } from "../bugs";
import configureStore from "../configureStore";

/**
 * Social test (chỉ xem tổng thể behavior, ko xem xét chi tiết)
 */
describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  // Là hàm, mà ko phải 1 object trực tiếp ==> để mỗi lần chạy là trả về 1 obj mới, các test sẽ ko bị ảnh hưởng nhau
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      // they should come from the cache
    });

    describe("if the bugs don't exist in the cache", () => {
      // they should be fetched from the server
      describe("loading indicators", () => {
        // * 3 tests
        // - should be true while fetching
        // - should be false after bugs are fetched
        // - should be false if the server fails
      });
    });
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    // * Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // * Act
    // Steps: dispatch(addBug(bugData)) => then, look at our store
    await store.dispatch(addBug(bug));
    console.log("MY BUG LIST", bugsSlice().list);

    // * Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    // * Arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    // * Act
    // Steps: dispatch(addBug(bugData)) => then, look at our store
    await store.dispatch(addBug(bug));
    console.log("MY BUG LIST", bugsSlice().list);

    // * Assert
    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark the bug as resolved if it's saved to the server.", async () => {
    fakeAxios
      .onPatch("/bugs/1")
      .reply(200, { id: 1, description: "a", resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({ description: "a" }));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server.", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({ description: "a" }));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1 },
        { id: 2, resolved: true },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);
      console.log("RESULT", result);

      expect(result).toHaveLength(2);
    });
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
