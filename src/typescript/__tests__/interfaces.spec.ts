import {
  checkLabel,
  createSquare,
  createClock,
  DigitalClock,
  AnalogClock,
  Point,
  SearchFunc,
  getCounter,
  EchoInterface,
  ClockConstructor,
  ClockInterface,
} from '../interfaces';

test('label', () => {
  const o = { size: 10, label: 'Size 10 Object' };
  expect(checkLabel(o)).toEqual(o.label);
});

test('optional properties', () => {
  expect(createSquare({})).toEqual({ color: 'white', area: 100 });
  const o = { color: 'blue', width: 20 };
  expect(createSquare(o)).toEqual({ color: 'blue', area: 400 });
});

test('readonly properties', () => {
  const p: Point = { x: 10, y: 20 };
  // After the assignment, x and y can’t be changed.
  expect(p).toEqual({ x: 10, y: 20 });

  // TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed.
  // you cannot modify below `ro` array.
  const ro: ReadonlyArray<number> = [1, 2, 3, 4];
  expect(ro).toEqual([1, 2, 3, 4]);

  const arr: Array<number> = ro as number[]; // override it with a type assertion
  expect(arr.length).toEqual(4);

  // const ==> variable, readonly ==> property
});

test('excess property checks', () => {
  const o = { colour: 'blue', width: 20 };
  expect(createSquare(o)).toEqual({ color: 'white', area: 400 });
});

test('function types', () => {
  // For function types to correctly type check, the names of the parameters do not need to match.
  const mySearch: SearchFunc = (src: string, sub: string): boolean => {
    return src.search(sub) > -1;
  };

  expect(mySearch('Hello', 'Hel')).toBeTruthy();
  expect(mySearch('Hello', 'hel')).toBeFalsy();
});

test('indexable types', () => {
  interface StringArray {
    // This index signature states that when a StringArray is indexed with a number, it will return a string.
    [index: number]: string;
  }

  const myArray: StringArray = ['Bob', 'Fred'];
  const myStr: string = myArray[0];
  expect(myStr).toEqual('Bob');

  interface NumberDictionary {
    [index: string]: number;

    length: number;
    // error: Property 'name' of type 'string' is not assignable to string index type 'number'.
    // name: string;
  }

  const myNumberDict: NumberDictionary = {
    length: 1,
    age: 23,
    2: 1234, // here 1234 is ok, since the index 2 is number, not string
  };

  expect(myNumberDict).toEqual({ length: 1, 2: 1234, age: 23 });

  interface NumberOrStringDictionary {
    [index: string]: number | string;

    length: number;
    name: string;
  }

  const myNumberOrStringDict: NumberOrStringDictionary = {
    length: 1,
    name: 'Ray',
    age: 23,
  };
  expect(myNumberOrStringDict).toEqual({ length: 1, name: 'Ray', age: 23 });

  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }

  const myReadonlyStringArray: ReadonlyStringArray = ['Alice', 'Bob'];
  // you can't modify this array
  expect(myReadonlyStringArray).toEqual(['Alice', 'Bob']);
});

describe('implementing an interface', () => {
  interface ScopeClockInterface {
    currentTime: Date;

    setTime(d: Date): void;
  }

  // when a class implements an interface, only the instance side of the class is checked.
  class Clock implements ScopeClockInterface {
    currentTime: Date;

    setTime(d: Date) {
      this.currentTime = d;
    }

    constructor(h: number, m: number) {
      this.setTime(new Date(2020, 1, 1, h, m, 0, 0));
    }
  }

  const clock: Clock = new Clock(1, 30);
  expect(clock.currentTime.getMonth()).toEqual(1);
});

describe('work with the static side of the class directly', () => {
  const digital = createClock(DigitalClock, 12, 17);
  const analog = createClock(AnalogClock, 7, 32);
  expect(digital.tick()).toEqual('beep beep');
  expect(analog.tick()).toEqual('tick tock');
  // we can also use use class expressions to get a object instance
  const Clock: ClockConstructor = class AnotherClock implements ClockInterface {
    currentTime: Date;

    setTime(d: Date): void {
      this.currentTime = d;
    }

    constructor(h: number, m: number) {
      this.setTime(new Date(2020, 2, 4, h, m));
    }

    tick(): string {
      return 'ding dong';
    }
  };
  const clock = new Clock(9, 22);
  expect(clock.tick()).toEqual('ding dong');
});

test('extending interfaces', () => {
  interface Shape {
    color: string;
  }

  interface PenStroke {
    penWidth: number;
  }

  interface Square extends Shape, PenStroke {
    sideLength: number;
  }

  const square = {} as Square;
  square.color = 'blue';
  square.sideLength = 10;
  square.penWidth = 5.0;

  expect(square).toEqual({
    color: 'blue',
    sideLength: 10,
    penWidth: 5.0,
  });
});

test('hybrid types', () => {
  const c = getCounter();
  expect(c.interval).toEqual(123);
  c(10);
  expect(c.interval).toEqual(10);
  c.reset();
  expect(c.interval).toEqual(0);
  c.interval = 5.0;
  expect(c.interval).toEqual(5.0);
});

test('generic interface', () => {
  const myEcho: EchoInterface = function <T>(value: T): T {
    return value;
  };
  expect(myEcho('Hello')).toEqual('Hello');
  expect(myEcho(1)).toEqual(1);
});
