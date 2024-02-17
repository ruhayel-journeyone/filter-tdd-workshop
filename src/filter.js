function filter(callbackFunction, array) {
  let filteredArray = [];
  for (let index = 0; index < array.length; index++) {
    let currentItem = array[index];
    if (callbackFunction(currentItem)) {
      filteredArray.push(currentItem);
    }
  }
  return filteredArray;
}
export default filter;
