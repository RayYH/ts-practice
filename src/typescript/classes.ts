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

export class PrivatePerson {
  // With TypeScript 3.8, TypeScript supports the new JavaScript syntax for private fields
  #name: string;
  // TypeScript also has it’s own way to declare a member as being marked private
  private aName: string;

  constructor(theName: string) {
    this.#name = theName;
    this.aName = theName;
  }
}

// TypeScript is a structural type system. When we compare two different types, regardless of where they came from,
// if the types of all members are compatible, then we say the types themselves are compatible.

// However, when comparing types that have private and protected members, we treat these types differently.
// For two types to be considered compatible, if one of them has a private member, then the other must have a
// private member that originated in the same declaration. The same applies to protected members.

export class PrivateAnimal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

export class PrivateRhino extends PrivateAnimal {
  constructor() {
    super('Rhino');
  }
}

export class PrivateEmployee {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

// The protected modifier acts much like the private modifier with the exception that members declared protected
// can also be accessed within deriving classes.

export class Employee extends Person {
  // Readonly properties must be initialized at their declaration or in the constructor.
  private readonly department: string;

  // if constructor are marked protected, the class cannot be instantiated outside of its containing class,
  // but can be extended.
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch(): string {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

export class Octopus {
  // Readonly properties must be initialized at their declaration or in the constructor.
  readonly numberOfLegs: number = 8;

  // Parameter properties are declared by prefixing a constructor parameter with
  // an accessibility modifier or readonly, or both. We can use o.name to access the name prop.
  // Using private for a parameter property declares and initializes a private member;
  // likewise, the same is done for public, protected, and readonly.
  constructor(readonly name: string) {}
}

const nameMaxLength = 10;

export class Website {
  private _name: string;

  // get/set - accessors
  // accessors with a get and no set are automatically inferred to be readonly. This is helpful when generating
  // a .d.ts file from your code, because users of your property can see that they can’t change it.
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

// Unlike an interface, an abstract class may contain implementation details for its members.
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
