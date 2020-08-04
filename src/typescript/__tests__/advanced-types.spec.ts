// get more info from https://www.staging-typescript.org/docs/handbook/advanced-types.html
test('user-defined type guards', () => {
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

  // To define a type guard, we simply need to define a function whose return type is a type predicate
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

  const pet = getSmallPet(Type.BIRD);
  let res: string;
  if (isFish(pet)) {
    // TypeScript will narrow that variable to Fish type
    res = pet.swim();
  } else {
    res = pet.fly();
  }

  expect(res).toEqual('bird fly');

  function move(pet: Fish | Bird): string {
    // The in operator now acts as a narrowing expression for types.
    if ('swim' in pet) {
      return pet.swim();
    }
    return pet.fly();
  }

  const anotherPet = getSmallPet(Type.FISH);
  expect(move(anotherPet)).toEqual('fish swim');
});

test('typeof type guards', () => {
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
  expect(padLeft('Hello world', 'Ray, ')).toEqual('Ray, Hello world');
});

test('instanceof type guards', () => {
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

  // The right side of the instanceof needs to be a constructor function
  if (padder instanceof SpaceRepeatingPadder) {
    // type narrowed to 'SpaceRepeatingPadder'
    expect(padder.getPaddingString()).toEqual('    ');
  }
  if (padder instanceof StringPadder) {
    // type narrowed to 'StringPadder'
    expect(padder.getPaddingString()).toEqual('  ');
  }
});

// TypeScript treats null and undefined differently in order to match JavaScript semantics. string | null is a
// different type than string | undefined and string | undefined | null.
test('nullable types', () => {
  let snu: string | null | undefined;
  snu = 'Hello';
  expect(snu).toEqual('Hello');
  snu = null;
  expect(snu).toBeNull();
  snu = undefined;
  expect(snu).toBeUndefined();
});

test('optional parameters and properties', () => {
  function f(x: number, y?: number) {
    return x + (y || 0);
  }

  expect(f(1, 2)).toEqual(3);
  expect(f(1)).toEqual(1);
  // error, 'null' is not assignable to 'number | undefined'
  expect(f(1, undefined)).toEqual(1);

  class C {
    a: number;
    b?: number;
  }

  const c = new C();
  c.a = 1;
  c.b = 2;
  // cannot be null
  c.b = undefined;
  expect(c.a).toEqual(1);
});

test('type guards and type assertions', () => {
  function f(sn: string | null): string {
    return sn || 'default';
  }

  expect(f(null)).toEqual('default');
  expect(f('Hello')).toEqual('Hello');

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

  function fn(name: string | null): string {
    // The syntax is postfix !: identifier! removes null and undefined from the type of identifier
    function postfix(epithet: string) {
      return name!.charAt(0) + '.  the ' + epithet; // ok
    }

    name = name || 'Bob';
    return postfix('great');
  }

  expect(fn(null)).toEqual('B.  the great');
  expect(fn('Ray')).toEqual('R.  the great');
});

describe('type aliases', () => {
  test('type aliases create a new name for a type.', () => {
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;

    function getName(n: NameOrResolver): Name {
      if (typeof n === 'string') {
        return n;
      } else {
        return n();
      }
    }

    const greet: NameResolver = () => {
      return 'Hello, World';
    };

    expect(getName('Ray')).toEqual('Ray');
    expect(getName(greet)).toEqual('Hello, World');
  });

  test('type aliases with interface', () => {
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

  test('type aliases can be generic', () => {
    type Container<T> = { value: T };
    const numberContainer: Container<number> = {
      value: 1,
    };
    const stringContainer: Container<string> = {
      value: 'A',
    };
    expect(numberContainer.value).toBe(1);
    expect(stringContainer.value).toBe('A');
  });

  test('type aliases refer to itself in a property', () => {
    type Tree<T> = {
      value: T;
      left?: Tree<T>;
      right?: Tree<T>;
    };

    const t: Tree<number> = {
      value: 1,
    };
    t.left = {
      value: 2,
    };
    expect(t.left.value).toBe(2);
  });

  test('type aliases with type intersections', () => {
    type LinkedList<T> = T & { next: LinkedList<T> };

    interface Person {
      name: string;
    }

    const people: LinkedList<Person> = {
      name: 'Ray',
      next: {
        name: 'Tom',
        next: {
          name: 'Mary',
          next: {} as LinkedList<Person>,
        },
      },
    };
    expect(people.name).toEqual('Ray');
    expect(people.next.name).toEqual('Tom');
    expect(people.next.next.name).toEqual('Mary');
  });
});

describe('literal types', () => {
  test('string literal types', () => {
    type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

    class UIElement {
      animate(dx: number, dy: number, easing: Easing) {
        if (easing === 'ease-in') {
          // ...
        } else if (easing === 'ease-out') {
        } else if (easing === 'ease-in-out') {
        } else {
          // error! should not pass null or undefined.
        }
      }
    }

    const button = new UIElement();
    button.animate(0, 0, 'ease-in');
  });

  test('number literal types', () => {
    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
      return (1 + getRandomInt(5)) as 1 | 2 | 3 | 4 | 5 | 6;
    }

    expect(rollDice()).toBeLessThanOrEqual(6);
    expect(rollDice()).toBeGreaterThanOrEqual(1);
  });
});

describe('discriminated unions', () => {
  interface Square {
    kind: 'square';
    size: number;
  }

  interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
  }

  interface Circle {
    kind: 'circle';
    radius: number;
  }

  type Shape = Square | Rectangle | Circle;

  function area(s: Shape) {
    switch (s.kind) {
      case 'square':
        return s.size * s.size;
      case 'rectangle':
        return s.height * s.width;
      case 'circle':
        return Math.PI * s.radius ** 2;
    }
  }

  const square: Square = {
    kind: 'square',
    size: 1,
  };
  const rectangle: Rectangle = {
    kind: 'rectangle',
    width: 2,
    height: 3,
  };
  const circle: Circle = {
    kind: 'circle',
    radius: 2,
  };

  expect(area(square)).toEqual(1);
  expect(area(rectangle)).toEqual(6);
  expect(area(circle)).toEqual(4 * Math.PI);
});

test('polymorphic this types', () => {
  class BasicCalculator {
    public constructor(protected value: number = 0) {}

    public currentValue(): number {
      return this.value;
    }

    public add(operand: number): this {
      this.value += operand;
      return this;
    }

    public multiply(operand: number): this {
      this.value *= operand;
      return this;
    }

    // ... other operations go here ...
  }

  class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
      super(value);
    }

    public sin(): this {
      this.value = Math.sin(this.value);
      return this;
    }

    // ... other operations go here ...
  }

  const v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
  expect(v).toEqual(0.4559788891106302);
});

test('tail call', () => {
  function factorial(n: number): number {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  }

  factorial(5);
});

test('index types', () => {
  // For any type T, keyof T is the union of known, public property names of T.
  // T[K] is an indexed access operator - regard T[K] as a whole
  function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map((n) => o[n]);
  }

  interface Car {
    manufacturer: string;
    model: string;
    year: number;
  }

  const taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014,
  };

  // Manufacturer and model are both of type string,
  // so we can pluck them both into a typed string array
  const makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
  expect(makeAndModel).toEqual(['Toyota', 'Camry']);

  // If we try to pluck model and year, we get an
  // array of a union type: (string | number)[]
  const modelYear = pluck(taxi, ['model', 'year']);
  expect(modelYear).toEqual(['Camry', 2014]);
});

test('An index signature parameter type must be string or number', () => {
  interface Dictionary<T> {
    [key: string]: T;
  }

  const dict: Dictionary<number> = {
    foo: 1,
  };

  let keys: keyof Dictionary<number>; // string | number
  const value: Dictionary<number>['foo'] = dict.foo; // number
  keys = 'string';
  expect(keys).toEqual('string');
  keys = 1;
  expect(keys).toEqual(1);
  expect(value).toEqual(1);
});

// create new types based on old types — mapped types
// In a mapped type, the new type transforms each property in the old type in the same way
test('mapped types', () => {
  interface Person {
    name: string;
    age: number;
  }

  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  type PersonPartial = Partial<Person>;
  type ReadonlyPerson = Readonly<Person>;
  const p1: PersonPartial = {}; // can be optional
  expect(p1).toEqual({});
  const p2: ReadonlyPerson = {
    name: 'Ray',
    age: 24,
  };
  expect(p2).not.toBeNull();

  // Add a new member using an intersection type
  type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P]; // notice here, using ?, means optional
  } & { newMember: boolean };

  const p3: PartialWithNewMember<Person> = {
    newMember: true,
  };
  expect(p3.newMember).toEqual(true);
  expect(p3.name).toBeUndefined();
  expect(p3.age).toBeUndefined();
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
