// refer https://jestjs.io/docs/en/api to get more info

describe('my beverage', () => {
  const myBeverage = {
    delicious: true,
    sour: false,
  };
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

describe('binaryStringToNumber', () => {
  const binaryStringToNumber = (binString: string): number => {
    if (!/^[01]+$/.test(binString)) {
      throw new TypeError('Not a binary number.');
    }

    return parseInt(binString, 2);
  };

  describe('given an invalid binary string', () => {
    test('composed of non-numbers throws TypeError', () => {
      expect(() => binaryStringToNumber('abc')).toThrowError(TypeError);
    });

    test('with extra whitespace throws TypeError', () => {
      expect(() => binaryStringToNumber('  100')).toThrowError(TypeError);
    });
  });

  describe('given a valid binary string', () => {
    test('returns the correct number', () => {
      expect(binaryStringToNumber('100')).toBe(4);
    });
  });
});

// %p - pretty-format.
// %s - String.
// %d - Number.
// %i - Integer.
// %f - Floating point value.
// %j - JSON.
// %o - Object.
// %# - Index of the test case.
// %% - single percent sign ('%'). This does not consume an argument.
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});

describe.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`('$a + $b', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });
});
