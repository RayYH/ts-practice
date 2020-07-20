test('type assertions', () => {
  // in below examples: name can only be asserted subtype of `string|number`
  // DO NOT USE <> syntax for consistent consideration
  // function getAngleAssert(name: string | number): number {
  //     /// consistent-type-assertions
  //     return (<string>name).length;
  // }
  //expect(getAngleAssert(name)).toEqual(name.length);
  function getAsAssert(name: string | number): number {
    return (name as string).length;
  }

  const name = 'ray';
  expect(getAsAssert(name)).toEqual(name.length);
});

test('alias', () => {
  type strOrNumber = string | number;
  let val: strOrNumber = 1;
  expect(val).toEqual(1);
  val = '1';
  expect(val).toEqual('1');

  interface NameInterface {
    name: string;
  }

  interface AgeInterface {
    age: number;
  }

  type commonInterface = NameInterface | AgeInterface;
  let common: commonInterface;
  common = { name: 'Ray' };
  expect(common).toEqual({ name: 'Ray' });
  common = { age: 24 };
  expect(common).toEqual({ age: 24 });

  type sexFlag = 0 | 1;

  function getSex(short: sexFlag): string {
    enum fullSexName {
      Male,
      Female,
    }

    return fullSexName[short];
  }

  expect(getSex(0)).toEqual('Male');
  expect(getSex(1)).toEqual('Female');
});

test('intersection', () => {
  function extend<First extends object, Second extends object>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
      if (first.hasOwnProperty(prop)) {
        (result as First)[prop] = first[prop];
      }
    }
    for (const prop in second) {
      if (second.hasOwnProperty(prop)) {
        (result as Second)[prop] = second[prop];
      }
    }
    return result as First & Second;
  }

  class Person {
    constructor(public name: string) {}
  }

  interface Greeter {
    greet(name: string): string;
  }

  class StringGreeter implements Greeter {
    greet(name: string): string {
      return `Hello, I'm ${name}.`;
    }
  }

  const jim = extend(new Person('Jim'), StringGreeter.prototype);
  expect(jim.name).toEqual('Jim');
  //expect(jim.greet('Jim')).toEqual("Hello, I'm Jim.");
});

test('union', () => {
  function isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  function isString(x: any): x is string {
    return typeof x === 'string';
  }

  /**
   * Takes a string and adds "padding" to the left.
   * If 'padding' is a string, then 'padding' is appended to the left side.
   * If 'padding' is a number, then that number of spaces is added to the left side.
   */
  function padLeft(value: string, padding: string | number): string {
    // we can just keep `typeof padding === "number" & typeof padding === "string"`
    if (isNumber(padding)) {
      return Array(padding + 1).join(' ') + value;
    }
    if (isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }

  expect(padLeft('Hello world', 4)).toEqual('    Hello world');
  expect(padLeft('Hello world', 5)).toEqual('     Hello world');
});

test('type guards', () => {
  interface Bird {
    fly(): string;

    layEggs(): string;
  }

  interface Fish {
    swim(): string;

    layEggs(): string;
  }

  class BirdImplementation implements Bird {
    fly(): string {
      return 'bird fly';
    }

    layEggs(): string {
      return 'bird lay eggs';
    }
  }

  class FishImplementation implements Fish {
    swim(): string {
      return 'fish swim';
    }

    layEggs(): string {
      return 'fish lay eggs';
    }
  }

  enum Type {
    BIRD,
    FISH,
  }

  function getSmallPet(type: Type): Fish | Bird {
    if (type == Type.FISH) {
      return new FishImplementation();
    } else {
      return new BirdImplementation();
    }
  }

  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

  const pet = getSmallPet(Type.BIRD);
  let res: string;
  if (isFish(pet)) {
    res = pet.swim();
  } else {
    res = pet.fly();
  }

  expect(res).toEqual('bird fly');

  function move(pet: Fish | Bird): string {
    if ('swim' in pet) {
      return pet.swim();
    }
    return pet.fly();
  }

  const anotherPet = getSmallPet(Type.FISH);
  expect(move(anotherPet)).toEqual('fish swim');
});

test('instanceof', () => {
  interface Padder {
    getPaddingString(): string;
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}

    getPaddingString(): string {
      return Array(this.numSpaces + 1).join(' ');
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) {}

    getPaddingString(): string {
      return this.value;
    }
  }

  function getRandomPadder(): Padder {
    return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder('  ');
  }

  // Type is 'SpaceRepeatingPadder | StringPadder'
  const padder: Padder = getRandomPadder();

  if (padder instanceof SpaceRepeatingPadder) {
    // type narrowed to 'SpaceRepeatingPadder'
    expect(padder.getPaddingString()).toEqual('    ');
  }
  if (padder instanceof StringPadder) {
    // type narrowed to 'StringPadder'
    expect(padder.getPaddingString()).toEqual('  ');
  }
});
