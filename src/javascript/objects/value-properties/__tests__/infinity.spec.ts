// Infinity is a property of the global object, which means a variable in global scope.

test('Infinity', () => {
  const maxNumber = Math.pow(10, 1000);
  expect(maxNumber).toEqual(Infinity);
  expect(1 / maxNumber).toEqual(0);
  expect(Infinity).toEqual(Infinity);
  expect(Infinity + 1).toEqual(Infinity);
  expect(Math.log(0)).toEqual(-Infinity);
  expect(1 / Infinity).toEqual(0);
  expect(1 / 0).toEqual(Infinity);
});
