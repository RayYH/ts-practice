// https://stackoverflow.com/questions/38740610/object-getprototypeof-vs-prototype

// `__proto__` is the actual object that is used in the lookup chain to resolve methods
// `prototype` is the object that is used to build `__proto__` when you create an object with `new` keyword
// `prototype` is a property of a Function object. It is the prototype of objects constructed by that function.
// `__proto__` is internal property of an object, pointing to its prototype.

describe('Function object have prototypes', () => {
  test('Function object', () => {
    // without new keyword
    const F = function () {
      console.log('F');
    };
    expect(F.prototype).not.toBe(undefined);
  });
  test('Normal object', () => {
    // with new keyword
    const o = {}; // equals to: let o = new Object();
    expect(Object.getPrototypeOf(o)).toStrictEqual({});
  });
});
