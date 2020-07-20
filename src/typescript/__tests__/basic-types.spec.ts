import { getArray, getBoolean, getEnum, getNumber, getString, getTuple, greeting } from '../basic-types';

test('boolean', () => {
  expect(getBoolean(true)).toBeFalsy();
  expect(getBoolean(false)).toBeTruthy();
});

test('number', () => {
  expect(getNumber('dec')).toEqual(6);
  expect(getNumber('oct')).toEqual(484);
  expect(getNumber('bin')).toEqual(10);
  expect(getNumber('hex')).toEqual(61453);
  expect(getNumber('default')).toEqual(0);
});

test('string', () => {
  expect(getString(10)).toHaveLength(10);
});

test('greeting', () => {
  expect(greeting('Ray')).toEqual('Hello, Ray!');
  expect(greeting('Tom')).toEqual('Hello, Tom!');
});

test('array', () => {
  expect(getArray('number')).toEqual([1, 2, 3]);
  expect(getArray('default-case')).toEqual([1, 2, 3]);
  expect(getArray('string')).toEqual(['one', 'two', 'three']);
  expect(getArray('any')).toEqual([1, true, 'free']);
});

test('tuple', () => {
  expect(getTuple(['Ray', 24])).toEqual("Ray's age is 24.");
  expect(getTuple(['Tom', 22])).toEqual("Tom's age is 22.");
});

test('enum', () => {
  expect(getEnum()).toEqual('[0 => RED 1 => GREEN 2 => BLUE][1 => RED 2 => GREEN 3 => BLUE]');
});

test('union types', () => {
  let unionType: string | number = 'union';
  expect(unionType).toEqual('union');
  unionType = 1;
  expect(unionType).toEqual(1);
});
