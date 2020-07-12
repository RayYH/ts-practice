/**
 * ref link: https://www.jianshu.com/p/afef44d449bd
 */
import { whatever } from '../../utils/whatever';

///// property decorator & method decorator
let globalString = '';

function age(args: number) {
  return function (target: any): void {
    target.prototype.age = args;
    whatever(target.prototype.age);
  };
}

function method(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  globalString = `${target}: ${propertyKey} ==> ${JSON.stringify(descriptor)}`;
}

@age(24)
class Person {
  name: string;
  age: number;

  constructor(name: string) {
    this.name = name;
  }

  @method
  instanceMethod(): string {
    return globalString;
  }

  @method
  static staticMethod(): string {
    return globalString;
  }
}

test('property decorator', () => {
  const p = new Person('Ray');
  expect(p.name).toEqual('Ray');
  expect(p.age).toEqual(24);
  expect(Person.prototype.age).toEqual(24);
});

test('method decorator', () => {
  // below example shows decorators called immediately
  const p = new Person('Ray');
  expect(p.instanceMethod()).toEqual(`function Person(name) {
        this.name = name;
    }: staticMethod ==> {"writable":true,"enumerable":true,"configurable":true}`);
  expect(Person.staticMethod()).toEqual(`function Person(name) {
        this.name = name;
    }: staticMethod ==> {"writable":true,"enumerable":true,"configurable":true}`);
});

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    descriptor.configurable = value;
  };
}

class Point {
  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x(): number {
    return this._x;
  }

  @configurable(false)
  get y(): number {
    return this._y;
  }
}

test('configurable', () => {
  const p = new Point(1, 2);
  expect(p.x).toEqual(1);
  expect(p.y).toEqual(2);
});

const stack: string[] = [];

function simpleDecorator(target: any, propertyKey: string): void {
  let value = target[propertyKey];
  // getter
  const getter = function (): any {
    stack.push(`Getter for ${propertyKey} returned ${value}`);
    return value;
  };
  // setter
  const setter = function (newVal: any): void {
    stack.push(`Set ${propertyKey} to ${newVal}`);
    value = newVal;
  };
  // redefine object properties
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Calculator {
  @simpleDecorator
  public num: number;

  square(): number {
    return this.num * this.num;
  }
}

test('getter & setter', () => {
  const cal = new Calculator();
  cal.num = 2;
  expect(cal.square()).toEqual(4);
  expect(stack).toEqual(['Set num to 2', 'Getter for num returned 2', 'Getter for num returned 2']);
});

const orders: string[] = [];

function ClassDecorator() {
  // one parameter
  return function (target: any): void {
    whatever(target);
    orders.push('class decorator');
  };
}

function MethodDecorator() {
  // three parameters
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): void {
    whatever(target);
    whatever(methodName);
    whatever(descriptor);
    orders.push('method decorator');
  };
}

function ParamOneDecorator() {
  // three parameters
  return function (target: any, methodName: string, paramIndex: number): void {
    whatever(target);
    whatever(methodName);
    whatever(paramIndex);
    orders.push('parameterOne decorator');
  };
}

function ParamTwoDecorator() {
  // three parameters
  return function (target: any, methodName: string, paramIndex: number): void {
    whatever(target);
    whatever(methodName);
    whatever(paramIndex);
    orders.push('parameterTwo decorator');
  };
}

function PropertyDecorator() {
  // two parameters
  return function (target: any, propertyName: string): void {
    whatever(target);
    whatever(propertyName);
    orders.push('property decorator');
  };
}

@ClassDecorator()
class Greeting {
  @PropertyDecorator()
  greeting: string;

  @MethodDecorator()
  greet(@ParamOneDecorator() pOne: string, @ParamTwoDecorator() pTwo: string): void {
    whatever(pOne);
    whatever(pTwo);
  }
}

test('order', () => {
  const g: Greeting = new Greeting();
  expect(g.greeting).toEqual(undefined);
  expect(orders).toEqual([
    'property decorator',
    'parameterTwo decorator',
    'parameterOne decorator',
    'method decorator',
    'class decorator',
  ]);
});

function changeClass(target: any): any {
  return class extends target {
    url: any = 'change class';
    getLink(): string {
      this.url = this.url + ' changed';
      return this.url;
    }
  };
}

@changeClass
class Website {
  public url: string | undefined;
  constructor() {
    this.url = 'init';
  }
  getLink(): any {
    return this.url;
  }
}

test('class decorator', () => {
  const w = new Website();
  expect(w.url).toEqual('change class');
  expect(w.getLink()).toEqual('change class changed');
});
