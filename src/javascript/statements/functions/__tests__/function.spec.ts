test('generator', () => {
  function* generator(i: number): Generator {
    yield i;
    yield i + 10;
  }

  const gen = generator(10);
  expect(gen.next().value).toEqual(10);
  expect(gen.next().value).toEqual(20);
});

test('simple example', () => {
  function* idMaker(): Generator {
    let index = 0;
    while (true) {
      yield index++;
    }
  }

  const gen = idMaker();
  expect(gen.next().value).toEqual(0);
  expect(gen.next().value).toEqual(1);
  expect(gen.next().value).toEqual(2);
  expect(gen.next().value).toEqual(3);
});

test('example with yield *', () => {
  function* anotherGenerator(i: number): Generator {
    yield i + 1;
    yield i + 2;
    yield i + 3;
  }

  function* generator(i: number): Generator {
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
  }

  const gen = generator(10);
  expect(gen.next().value).toEqual(10);
  expect(gen.next().value).toEqual(11);
  expect(gen.next().value).toEqual(12);
  expect(gen.next().value).toEqual(13);
  expect(gen.next().value).toEqual(20);
});

test('Passing arguments into Generators', () => {
  const stack: any[] = [];
  let index = 0;

  function* strGenerator(): Generator {
    stack[index++] = 0;
    stack[index++] = `1 ${yield}`;
    stack[index++] = `2 ${yield}`;
    stack[index++] = `3 ${yield}`;
  }

  const gen = strGenerator();
  gen.next();
  expect(stack).toEqual([0]);
  gen.next('pretzel');
  expect(stack).toEqual([0, '1 pretzel']);
  gen.next('california');
  expect(stack).toEqual([0, '1 pretzel', '2 california']);
  gen.next('mayonnaise');
  expect(stack).toEqual([0, '1 pretzel', '2 california', '3 mayonnaise']);
});

test('Return statement in a generator', () => {
  function* yieldAndReturn(): Generator {
    yield 'Y';
    return 'R';
  }

  const gen = yieldAndReturn();
  expect(gen.next()).toEqual({ value: 'Y', done: false });
  expect(gen.next()).toEqual({ value: 'R', done: true });
  expect(gen.next()).toEqual({ value: undefined, done: true });
});

test('Generator as an object method', () => {
  class Foo {
    *generator(): Generator {
      yield 1;
      yield 2;
      yield 3;
    }
  }

  const f = new Foo();
  const gen = f.generator();
  expect(gen.next()).toEqual({ value: 1, done: false });
  expect(gen.next()).toEqual({ value: 2, done: false });
  expect(gen.next()).toEqual({ value: 3, done: false });
  expect(gen.next()).toEqual({ value: undefined, done: true });
});

test('Generator as a computed property', () => {
  class Foo {
    // * means generator function
    // Symbol.iterator declares default iterator of given class
    *[Symbol.iterator](): Generator {
      yield 1;
      yield 2;
    }
  }

  const SomeObj = {
    *[Symbol.iterator](): Generator {
      yield 'a';
      yield 'b';
    },
  };

  expect(Array.from(new Foo())).toEqual([1, 2]);
  expect(Array.from(SomeObj)).toEqual(['a', 'b']);
});

test('Generator defined in an expression', () => {
  const foo = function* (): Generator {
    yield 10;
    yield 20;
  };

  const bar = foo();
  expect(bar.next()).toEqual({ value: 10, done: false });
});
