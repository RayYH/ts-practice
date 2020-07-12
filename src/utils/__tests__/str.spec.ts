import { randomString } from '../str';

test('length', () => {
  expect(randomString(10)).toHaveLength(10);
});

test('random', () => {
  expect(randomString(10)).not.toBe(randomString(10));
});
