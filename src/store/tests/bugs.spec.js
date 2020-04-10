import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { addBug, getUnresolvedBugs } from "../bugs";
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

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
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
