test('block', () => {
  const x = 1;
  {
    const x = 2;
    expect(x).toEqual(2);
  }
  expect(x).toEqual(1);
  const y = 1;
  {
    // `const y` will not throw an error!
    const y = 2;
    expect(y).toEqual(2);
  }
  expect(y).toEqual(1);
});

test('var vs let', () => {
  const a = [];
  // change let to var will get a[0] = 10, a[1] = 10, a[6] = 10;
  for (let i = 0; i < 10; i++) {
    a[i] = function (): number {
      return i;
    };
  }

  expect(a[0]()).toEqual(0);
  expect(a[1]()).toEqual(1);
  expect(a[6]()).toEqual(6);
});
