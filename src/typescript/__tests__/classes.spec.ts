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
} from '../classes';

test('class', () => {
  const greeter = new Greeter('Ray');
  expect(greeter.greet()).toEqual('Hello, Ray');
});

test('inheritance', () => {
  const john = new Animal('john');
  const sam = new Snake('sam');
  const tom: Animal = new Horse('tom');
  expect(john.move()).toEqual('john moved 0m.');
  expect(sam.move()).toEqual('Slithering: sam moved 5m.');
  expect(sam.move(20)).toEqual('Slithering: sam moved 20m.');
  expect(tom.move()).toEqual('Galloping: tom moved 45m.');
  expect(tom.move(34)).toEqual('Galloping: tom moved 34m.');
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
    website.name = 'averylongstring';
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
  const greeterMaker: typeof AnotherGreeter = AnotherGreeter; // saved constructor
  greeterMaker.standardGreeting = 'Hey there!';
  const greeterTwo: AnotherGreeter = new greeterMaker();
  expect(greeterTwo.greet()).toEqual('Hey there!');
});

test('static method', () => {
  expect(Website.description()).toEqual('Website');
});
