import { isEven } from "./math";

describe("isEven", () => {
  // it(tên_của_test, test_function)
  it("should return true if given an even number", () => {
    // Function under test ~ System under test (SUT)
    const result = isEven(2);

    // Make an assertion
    expect(result).toEqual(true);
  });

  it("should return false if given an odd number", () => {
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
