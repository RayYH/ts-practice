test('continue', () => {
  let i = 0;
  let n = 0;
  while (i < 5) {
    i++;
    if (i === 3) {
      continue;
    }
    n += i;
  }

  // n = 1+2+4+5 = 12
  expect(n).toEqual(12);
});

test('continue with label', () => {
  let res = '';

  iLoop: for (let i = 0; i < 5; i++) {
    jLoop: for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (i != 1) {
          continue iLoop;
        }
        if (j != 2) {
          continue jLoop;
        }
        if (k != 3) {
          continue;
        }
        res += `${i} ${j} ${k}`;
      }
    }
  }

  expect(res).toEqual('1 2 3');
});
