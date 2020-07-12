import { whatever } from '../../../utils/whatever';

test('break', () => {
  let i = 0;
  while (i < 6) {
    if (i === 3) {
      break;
    }
    i += 1;
  }

  expect(i).toEqual(3);
});

test('embedded blocks', () => {
  let x = 1;
  outerBlock: {
    innerBlock: {
      if (x == 1) {
        x += 1;
        whatever(x);
        break innerBlock;
      }
      break outerBlock;
    }
  }

  expect(x).toEqual(2);
});
