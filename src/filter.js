function filter(callbackFunction, array) {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
  return filteredArray;
}
export default filter;
