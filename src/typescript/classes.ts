// In TypeScript, each member is public by default.
export class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet(): string {
    return 'Hello, ' + this.greeting;
  }
}

export class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMeters = 0): string {
    return `${this.name} moved ${distanceInMeters}m.`;
  }
}

export class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 5): string {
    return 'Slithering: ' + super.move(distanceInMeters);
  }
}

export class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 45): string {
    return 'Galloping: ' + super.move(distanceInMeters);
  }
}

class Person {
  protected name: string;

  // protected means you cannot use syntax: let p = new Person("Ray");
  protected constructor(name: string) {
    this.name = name;
  }
}

export class Employee extends Person {
  // Readonly properties must be initialized at their declaration or in the constructor.
  private readonly department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch(): string {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

export class Octopus {
  readonly numberOfLegs: number = 8;

  // Parameter properties are declared by prefixing a constructor parameter with an accessibility modifier or readonly, or both.
  constructor(readonly name: string) {}
}

const nameMaxLength = 10;

export class Website {
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (newName && newName.length > nameMaxLength) {
      throw new Error('name has a max length of ' + nameMaxLength);
    }

    this._name = newName;
  }

  static description(): string {
    return 'Website';
  }
}

export class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }): number {
    const xDist = point.x - Grid.origin.x;
    const yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

export abstract class Department {
  protected constructor(public name: string) {}

  printName(): string {
    return 'Department name: ' + this.name;
  }

  abstract printMeeting(): string; // must be implemented in derived classes
}

export class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // constructors in derived classes must call super()
  }

  printMeeting(): string {
    return 'The Accounting Department meets each Monday at 10am.';
  }

  generateReports(): string {
    return 'Generating accounting reports...';
  }
}

export class AnotherGreeter {
  static standardGreeting = 'Hello, there';
  greeting: string;
  greet(): string {
    if (this.greeting) {
      return 'Hello, ' + this.greeting;
    } else {
      return AnotherGreeter.standardGreeting;
    }
  }
}

export default { Greeter, Animal, Snake, Horse, Website };
