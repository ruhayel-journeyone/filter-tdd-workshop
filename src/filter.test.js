import filter from "./filter";
describe("filter", () => {
  describe("Given a callback function and an array", () => {
    it("invokes the callback function once per item in the array", () => {
      const arrayToFilter = [1, 2, 3];
      const numberOfItemsInArrayToFilter = arrayToFilter.length;
      let numberOfTimesCallbackFunctionWasInvoked = 0;
      function callbackFunction() {
        numberOfTimesCallbackFunctionWasInvoked++;
      }
      filter(callbackFunction, arrayToFilter);
      expect(numberOfTimesCallbackFunctionWasInvoked).toBe(
        numberOfItemsInArrayToFilter
      );
    });
  });
});
