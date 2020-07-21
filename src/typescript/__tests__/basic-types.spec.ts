import { getArray, getBoolean, getEnum, getNumber, getString, getTuple, greeting } from '../basic-types';

declare const maybe: unknown;

test('boolean', () => {
  expect(getBoolean(true)).toBeFalsy();
  expect(getBoolean(false)).toBeTruthy();
});

test('number', () => {
  expect(getNumber('dec')).toEqual(6);
  expect(getNumber('oct')).toEqual(484);
  expect(getNumber('bin')).toEqual(10);
  expect(getNumber('hex')).toEqual(61453);
  expect(getNumber('bigint')).toEqual(100n);
  expect(getNumber('default')).toEqual(0);
});

test('string', () => {
  expect(getString(10)).toHaveLength(10);
});

test('greeting', () => {
  expect(greeting('Ray')).toEqual('Hello, Ray!');
  expect(greeting('Tom')).toEqual('Hello, Tom!');
  expect(greeting('Ray', 25)).toEqual('Hello, my name is Ray.' + '\n\n' + "I'll be 26 years old next year.");
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

/**
 * We may need to describe the type of variables that we do not know when we are writing an application.
 * These values may come from dynamic content or we may want to intentionally accept all values in our API.
 */
test('unknown', () => {
  let notSure: unknown = 4;
  expect(notSure).toEqual(4);
  notSure = 'maybe a string instead';
  expect(notSure).toEqual('maybe a string instead');
  notSure = false;
  expect(notSure).toBeFalsy();
});

test('maybe', () => {
  // we can use typeof to check the type of unknown type
  if (typeof maybe === 'string') {
  } else if (typeof maybe === 'number') {
  } else {
  }
  expect(true).toBeTruthy();
});

/**
 * Unlike unknown, variables of type any allow you to access arbitrary properties, even ones that don’t exist.
 * All the convenience of any comes at the cost of losing type safety. Type safety is one of the main motivations
 * for using TypeScript and you should try to avoid using any when not necessary.
 */
test('any', () => {
  function getValue(key: string): any {
    return key.toUpperCase();
  }

  const str: string = getValue('String');
  expect(str).toEqual('STRING');

  const looselyTyped: any = 4;
  expect(looselyTyped.toFixed(2)).toEqual('4.00');
});

test('never', () => {
  // Function returning never must not have a reachable end point
  // Throws an error or infinite loop
  function error(message: string): never {
    throw new Error(message);
  }

  // Inferred return type is never
  function fail() {
    return error('Something failed');
  }

  try {
    fail();
  } catch (e) {
    expect(e.toString()).toEqual('Error: Something failed');
  }
});

test('object', () => {
  function mergeObject(o1: object, o2: object): object {
    return { ...o1, ...o2 };
  }

  expect(mergeObject({}, {})).toEqual({});
  expect(mergeObject({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  expect(mergeObject({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
});

test('type-assertions', () => {
  describe('as-syntax', () => {
    const someValue: any = 'this is a string';
    const strLength: number = (someValue as string).length;
    expect(strLength).toEqual(16);
  });
  describe('angle-bracket syntax', () => {
    const someValue: any = 'this is a string';
    const strLength: number = (<string>someValue).length;
    expect(strLength).toEqual(16);
  });
});
