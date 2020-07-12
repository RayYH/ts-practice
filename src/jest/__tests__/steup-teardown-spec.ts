import { isCity, initializeCityDatabase, clearCityDatabase, getStore, pushCity, popCity } from '../city-store';

const stack: string[] = [];
const orderStack: string[] = [];

beforeAll(() => {
  initializeCityDatabase(getStore());
  stack.push('1 - beforeAll');
});

afterAll(() => {
  clearCityDatabase(getStore());
  stack.push('1 - afterAll');
});

beforeEach(() => {
  pushCity(getStore());
  stack.push('1 - beforeEach');
});

afterEach(() => {
  popCity(getStore());
  stack.push('1 - afterEach');
});

test('city database has Vienna', () => {
  expect(isCity(getStore(), 'Vienna')).toBeTruthy();
  expect(getStore().cities.length).toBe(5);
  stack.push('1 - test 1');
});

test('city database has San Juan', () => {
  expect(isCity(getStore(), 'San Juan')).toBeTruthy();
  expect(getStore().cities.length).toBe(5);
  stack.push('1 - test 2');
});

describe('Scoped / Nested block', () => {
  beforeAll(() => {
    stack.push('2 - beforeAll');
  });

  afterAll(() => {
    stack.push('2 - afterAll');
  });

  beforeEach(() => {
    stack.push('2 - beforeEach');
  });

  afterEach(() => {
    stack.push('2 - afterEach');
  });

  test('', () => {
    stack.push('2 - test');
  });
});

test('stack orders', () => {
  expect(stack).toEqual([
    '1 - beforeAll',
    '1 - beforeEach',
    '1 - test 1',
    '1 - afterEach',
    '1 - beforeEach',
    '1 - test 2',
    '1 - afterEach',
    '2 - beforeAll',
    '1 - beforeEach',
    '2 - beforeEach',
    '2 - test',
    '2 - afterEach',
    '1 - afterEach',
    '2 - afterAll',
    '1 - beforeEach',
  ]);
});

describe('outer', () => {
  orderStack.push('describe outer-a');

  describe('describe inner 1', () => {
    orderStack.push('describe inner 1');
    test('test 1', () => {
      orderStack.push('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  orderStack.push('describe outer-b');

  test('test 1', () => {
    orderStack.push('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    orderStack.push('describe inner 2');
    test('test for describe inner 2', () => {
      orderStack.push('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  orderStack.push('describe outer-c');
});

test('Order of execution of describe and test blocks', () => {
  expect(orderStack).toEqual([
    'describe outer-a',
    'describe inner 1',
    'describe outer-b',
    'describe inner 2',
    'describe outer-c',
    'test for describe inner 1',
    'test for describe outer',
    'test for describe inner 2',
  ]);
});
