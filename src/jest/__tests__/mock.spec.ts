import { whatever } from '../../utils/whatever';

test('mock function', () => {
  function forEach(items: number[], callback: any): void {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }

  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test('.mock property and mock matchers', () => {
  // get instances via .mock.instances
  const myMock = jest.fn();
  const a = new myMock();
  const b = {};
  const bound = myMock.bind(b);
  bound();
  expect(myMock.mock.instances[0]).toEqual(a);
  expect(myMock.mock.instances[1]).toEqual(b);

  function callMock(paramOne: string, paramTwo: string, callback: any): void {
    callback(paramOne, paramTwo);
  }

  const someMockFunction = jest
    .fn((paramOne: string, paramTwo: string) => {
      whatever(paramOne);
      whatever(paramTwo);
      return 'return value';
    })
    .mockName('my mock');

  callMock('first arg', 'second arg', someMockFunction);
  const test = new someMockFunction('', '');
  // The function was called exactly once
  expect(someMockFunction.mock.calls.length).toBe(2);
  // The first arg of the first call to the function was 'first arg'
  expect(someMockFunction.mock.calls[0][0]).toBe('first arg');
  // The second arg of the first call to the function was 'second arg'
  expect(someMockFunction.mock.calls[0][1]).toBe('second arg');
  // The return value of the first call to the function was 'return value'
  expect(someMockFunction.mock.results[0].value).toBe('return value');
  // This function was instantiated exactly once
  expect(someMockFunction.mock.instances.length).toBe(2);
  // The object returned by the second instantiation of this function
  // had a `name` property whose value was set to 'test'
  expect(someMockFunction.mock.instances[1]).toEqual(test);
  // The mock function was called at least once
  expect(someMockFunction).toHaveBeenCalled();
  // The mock function was called at least once with the specified args
  expect(someMockFunction).toHaveBeenCalledWith('first arg', 'second arg');
  // The last call to the mock function was called with the specified args
  expect(someMockFunction).toHaveBeenLastCalledWith('', '');
  // All calls and the name of the mock is written as a snapshot
  expect(someMockFunction).toMatchSnapshot();
  // The mock function was called at least once
  expect(someMockFunction.mock.calls.length).toBeGreaterThan(0);
  // The mock function was called at least once with the specified args
  expect(someMockFunction.mock.calls).toContainEqual(['first arg', 'second arg']);
  // The last call to the mock function was called with the specified args
  expect(someMockFunction.mock.calls[someMockFunction.mock.calls.length - 1]).toEqual(['', '']);

  // The first arg of the last call to the mock function was an empty string
  // (note that there is no sugar helper for this specific of an assertion)
  expect(someMockFunction.mock.calls[someMockFunction.mock.calls.length - 1][0]).toBe('');

  // A snapshot will check that a mock was invoked the same number of times,
  // in the same order, with the same arguments. It will also assert on the name.
  expect(someMockFunction.mock.calls).toEqual([
    ['first arg', 'second arg'],
    ['', ''],
  ]);
  expect(someMockFunction.getMockName()).toBe('my mock');
});

test('mock return values', () => {
  const myMock = jest.fn();
  expect(myMock()).toBeUndefined();
  myMock.mockReturnValueOnce('x').mockReturnValueOnce(10).mockReturnValueOnce(true);
  expect(myMock()).toEqual('x');
  expect(myMock()).toEqual(10);
  expect(myMock()).toEqual(true);
  expect(myMock()).toBeUndefined();

  const filterTestFn = jest.fn();
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
  const result = [11, 12].filter((num) => filterTestFn(num));

  expect(result).toEqual([11]);
  expect(filterTestFn.mock.calls).toEqual([[11], [12]]);
});

test('mock implementations', () => {
  const myMockFn = jest.fn((cb) => cb(null, true));
  myMockFn((err: string, val: boolean) => expect(val).toBe(true));
  const myAnotherMockFn = jest
    .fn()
    .mockImplementationOnce((cb) => cb(null, true))
    .mockImplementationOnce((cb) => cb(null, false));
  myAnotherMockFn((err: any, value: boolean) => {
    expect(value).toBe(true);
  });
  myAnotherMockFn((err: any, value: boolean) => {
    expect(value).toBe(false);
  });
});

test('default mock implementation', () => {
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');
  expect([myMockFn(), myMockFn(), myMockFn(), myMockFn()]).toEqual(['first call', 'second call', 'default', 'default']);

  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
    foo(): string {
      return 'bar';
    },
  };

  expect(myObj.foo()).toBe('bar');
  expect(myObj.myMethod().foo()).toBe('bar');
});
