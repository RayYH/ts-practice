describe('properties', () => {
  test('length', () => {
    expect([1, 2].length).toBe(2);
  });
  test('dynamic length', () => {
    const arr = [1, 2];
    expect(arr).toEqual([1, 2]);
    arr.length = 5;
    expect(arr).toEqual([1, 2, undefined, undefined, undefined]);
  });
});

describe('examples', () => {
  test('Iterating over an array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const length = numbers.length;
    for (let i = 0; i < length; i++) {
      numbers[i] = numbers[i] * 2;
    }
    expect(numbers).toEqual([2, 4, 6, 8, 10]);
  });

  test('Shortening an array', () => {
    const numbers = [1, 2, 3, 4, 5];
    numbers.length = 3;
    expect(numbers).toEqual([1, 2, 3]);
  });
});

describe('Array.from', () => {
  test('array from a string', () => {
    expect(Array.from('foo')).toEqual(['f', 'o', 'o']);
  });
  test('array from with map function', () => {
    expect(Array.from([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
    // v - undefined.
    expect(Array.from({ length: 5 }, (v, i) => i)).toEqual([0, 1, 2, 3, 4]);
  });
  test('array from a set', () => {
    const set = new Set(['foo', 'bar', 'baz', 'foo']);
    expect(Array.from(set)).toEqual(['foo', 'bar', 'baz']);
  });
  test('array from a map', () => {
    const map = new Map([
      [1, 2],
      [2, 4],
      [4, 8],
    ]);
    expect(Array.from(map)).toEqual([
      [1, 2],
      [2, 4],
      [4, 8],
    ]);
    const mapper = new Map([
      ['1', 'a'],
      ['2', 'b'],
    ]);
    expect(Array.from(mapper.values())).toEqual(['a', 'b']);
    expect(Array.from(mapper.keys())).toEqual(['1', '2']);
  });
  test('Array from an Array-like object (arguments)', () => {
    function getArrayFromArguments<T>(...params: T[]): T[] {
      return Array.from(params);
    }

    expect(getArrayFromArguments(1, 2, 3)).toEqual([1, 2, 3]);
    expect(getArrayFromArguments('foo', 'bar', 'baz')).toEqual(['foo', 'bar', 'baz']);
  });
  test('Sequence generator (range)', () => {
    const range = (start: any, stop: any, step: number): any[] =>
      Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    expect(range(0, 4, 1)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
    expect(range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map((x) => String.fromCharCode(x))).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]);
  });
});

describe('Array.isArray', () => {
  expect(Array.isArray([1, 2, 3])).toBeTruthy();
  expect(Array.isArray([])).toBeTruthy();
  expect(Array.isArray(Array.prototype)).toBeTruthy();
  expect(Array.isArray({ foo: 123 })).toBeFalsy();
  expect(Array.isArray('foobar')).toBeFalsy();
  expect(Array.isArray(undefined)).toBeFalsy();
  expect(Array.isArray(null)).toBeFalsy();
  expect(Array.isArray({ __proto__: Array.prototype })).toBeFalsy();
  expect(Array.isArray(new Uint8Array(32))).toBeFalsy();
});
