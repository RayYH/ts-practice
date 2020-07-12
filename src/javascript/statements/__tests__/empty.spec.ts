test('empty', () => {
  const arr = [1, 2, 3];
  // for (let i = 0; i < arr.length; arr[i++] = 0);
  // equals
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
  expect(arr).toEqual([0, 0, 0]);
});
