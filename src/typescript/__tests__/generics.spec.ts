import { arrayLength, GenericNumber, getProperty, identity, identityArray, loggingIdentity } from '../generics';

test('basic', () => {
  const list: any[] = ['1', 2, { '3': 3 }];
  list.forEach((element) => {
    expect(identity(element)).toEqual(element);
  });
  const numberList = [1, 2, 3];
  const stringList = ['one', 'two', 'three'];
  expect(arrayLength(numberList)).toEqual(3);
  expect(arrayLength(stringList)).toEqual(3);
  expect(identityArray(numberList)).toEqual(numberList);
  expect(identityArray(stringList)).toEqual(stringList);
});

test('generic types', () => {
  interface GenericIdentityFn {
    // <T> means generic, arg: T means arg type is T, last T means return type
    <T>(arg: T): T;
  }
  function identity<T>(arg: T): T {
    return arg;
  }
  const myIdentity: GenericIdentityFn = identity;
  const list: any[] = ['1', 2, { '3': 3 }];
  list.forEach((element) => {
    expect(myIdentity(element)).toEqual(element);
  });
});

test('generic classes', () => {
  // number
  const myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y): number {
    return x + y;
  };
  expect(myGenericNumber.add(myGenericNumber.zeroValue, 1)).toEqual(1);
  //
  const myStringNumeric = new GenericNumber<string>();
  myStringNumeric.zeroValue = '';
  myStringNumeric.add = function (x, y): string {
    return x + y;
  };
  expect(myStringNumeric.add(myStringNumeric.zeroValue, 'Hello')).toEqual('Hello');
});

test('generic constrains', () => {
  expect(loggingIdentity({ length: 10, value: 3 })).toEqual(10);
});

test('using type parameters in generic constraints', () => {
  const x = { a: 1, b: 2, c: 3, d: 4 };
  // the key must be one of x.keys
  expect(getProperty(x, 'a')).toEqual(x.a);
});

test('show some usages', () => {
  // this test case just show type inference
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  const lion = createInstance(Lion);
  lion.numLegs = 4;
  lion.keeper = new ZooKeeper();
  lion.keeper.nametag = 'lion';
  const bee = createInstance(Bee);
  bee.numLegs = 6;
  bee.keeper = new BeeKeeper();
  bee.keeper.hasMask = false;
});
