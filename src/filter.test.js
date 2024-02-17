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
    it("invokes the callback function passing it an item from the array as a paramater", () => {
      const callbackFunction = jest.fn();
      const arrayToFilter = [1, 4];
      filter(callbackFunction, arrayToFilter);
      expect(callbackFunction).toHaveBeenNthCalledWith(1, 1);
      expect(callbackFunction).toHaveBeenNthCalledWith(2, 4);
    });
    it("returns an array", () => {
      function callbackFunction(item) {}
      const arrayToFilter = [];
      const filteredArray = filter(callbackFunction, arrayToFilter);
      expect(filteredArray).toBeInstanceOf(Array);
    });
  });
});
