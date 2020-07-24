import {
  AccountingDepartment,
  Animal,
  AnotherGreeter,
  Department,
  Employee,
  Greeter,
  Grid,
  Horse,
  Octopus,
  Snake,
  Website,
  PrivatePerson,
  PrivateAnimal,
  PrivateRhino,
  PrivateEmployee,
} from '../classes';

test('greeter class', () => {
  const greeter = new Greeter('Ray');
  expect(greeter.greet()).toEqual('Hello, Ray');
});

test('inheritance', () => {
  const john = new Animal('John');
  const sam = new Snake('Sam');
  const tom: Animal = new Horse('Tom');
  expect(john.move()).toEqual('John moved 0m.');
  expect(sam.move()).toEqual('Slithering: Sam moved 5m.');
  expect(sam.move(20)).toEqual('Slithering: Sam moved 20m.');
  expect(tom.move()).toEqual('Galloping: Tom moved 45m.');
  expect(tom.move(34)).toEqual('Galloping: Tom moved 34m.');
});

test('private property', () => {
  const privatePerson = new PrivatePerson('Bob');
  expect(privatePerson).not.toBeNull();
});

test('compatible in private fields', () => {
  let animal = new PrivateAnimal('Goat');
  expect(animal).not.toBeNull();
  const rhino = new PrivateRhino();
  const employee = new PrivateEmployee('Bob');
  animal = rhino; // it's ok
  // animal = employee; // invalid
  expect(animal).not.toBeNull();
  expect(employee).not.toBeNull();
});

test('protected property', () => {
  const howard = new Employee('Howard', 'Sales');
  expect(howard.getElevatorPitch()).toEqual('Hello, my name is Howard and I work in Sales.');
});

test('parameter properties', () => {
  const o = new Octopus('John');
  expect(o.numberOfLegs).toEqual(8);
  expect(o).toEqual({ numberOfLegs: 8, name: 'John' });
});

test('getter & setter', () => {
  const website = new Website();
  website.name = 'google.com';
  expect(website.name).toEqual('google.com');
  try {
    website.name = 'a very long string';
  } catch (e) {
    expect(e.message).toEqual('name has a max length of 10');
  }
});

test('static property', () => {
  const gridOne = new Grid(1.0);
  const gridTwo = new Grid(5.0);
  expect(gridOne.calculateDistanceFromOrigin({ x: 6, y: 8 })).toEqual(10);
  expect(gridTwo.calculateDistanceFromOrigin({ x: 6, y: 8 })).toEqual(2);
});

test('static method', () => {
  expect(Website.description()).toEqual('Website');
});

test('abstract classes', () => {
  // cannot use new Department()
  const department: Department = new AccountingDepartment();
  expect(department.name).toEqual('Accounting and Auditing');
  expect(department.printName()).toEqual('Department name: Accounting and Auditing');
  expect(department.printMeeting()).toEqual('The Accounting Department meets each Monday at 10am.');
  // cannot call department.generateReports() method
  const accountingDepartment: AccountingDepartment = new AccountingDepartment();
  expect(accountingDepartment.name).toEqual('Accounting and Auditing');
  expect(accountingDepartment.printName()).toEqual('Department name: Accounting and Auditing');
  expect(accountingDepartment.printMeeting()).toEqual('The Accounting Department meets each Monday at 10am.');
  expect(accountingDepartment.generateReports()).toEqual('Generating accounting reports...');
});

test('advanced topics', () => {
  const greeterOne: AnotherGreeter = new AnotherGreeter();
  expect(greeterOne.greet()).toEqual('Hello, there');
  greeterOne.greeting = 'World';
  expect(greeterOne.greet()).toEqual('Hello, World');
  // give me the type of the Greeter class itself rather than the instance type
  const greeterMaker: typeof AnotherGreeter = AnotherGreeter;
  greeterMaker.standardGreeting = 'Hey there!';
  const greeterTwo: AnotherGreeter = new greeterMaker();
  expect(greeterTwo.greet()).toEqual('Hey there!');
});

test('using a class as an interface', () => {
  // As we said in the previous section, a class declaration creates two things: a type representing instances of the
  // class and a constructor function. Because classes create types, you can use them in the same places you would
  // be able to use interfaces.
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
    z: number;
  }

  const point3d: Point3d = { x: 1, y: 2, z: 3 };
  expect(point3d).not.toBeNull();
});
