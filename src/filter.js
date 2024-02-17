function filter(callbackFunction, array) {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    if (callbackFunction(array[index])) {
      filteredArray.push(array[index]);
    }
  }
  return filteredArray;
}
export default filter;
