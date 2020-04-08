import { addBug, bugAdded } from "../bugs";
import { apiCallBegan } from "../api";

// Demo solitary test
describe("bugsSlice", () => {
  describe("action creators", () => {
    // Mục đích test riêng lẻ action creator addBug này
    it("addBug", () => {
      const bug = { description: "a" };
      const result = addBug(bug);
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: "/bugs",
          method: "post",
          data: bug,
          onSuccess: bugAdded.type,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
