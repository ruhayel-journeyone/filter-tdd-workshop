function filter(callbackFunction, array) {
  for (let index = 0; index < array.length; index++) {
    callbackFunction(array[index]);
  }
  return array;
}
export default filter;
