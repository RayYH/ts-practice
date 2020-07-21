// Simple interface
interface LabeledValue {
  label: string;
}

export function checkLabel(labelObj: LabeledValue): string {
  return labelObj.label;
}

// Optional properties
interface SquareConfig {
  color?: string;
  width?: number;

  // could also have any number of other properties
  [propName: string]: any;
}

interface Square {
  color: string;
  area: number;
}

export function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare: Square = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// Readonly properties
// Some properties should only be modifiable when an object is first created.
export interface Point {
  readonly x: number;
  readonly y: number;
}

// interfaces are also capable of describing function types.
export interface SearchFunc {
  (source: string, subString: string): boolean;
}

// ClockInterface for the instance methods
export interface ClockInterface {
  currentTime: Date;

  tick(): string;
}

// ClockConstructor for the constructor
// signature: new(...): Interface;
export interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// constructor function createClock that creates instances of the type ClockInterface
// signature: return new constructor(...);
export function createClock(constructor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new constructor(hour, minute);
}

// implement interfaces
export class DigitalClock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(h: number, m: number) {
    this.currentTime = new Date(2020, 2, 2, h, m);
  }

  tick(): string {
    return 'beep beep';
  }
}

export class AnalogClock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(h: number, m: number) {
    this.currentTime = new Date(2020, 2, 3, h, m);
  }

  tick(): string {
    return 'tick tock';
  }
}

interface Counter {
  (start: number): string;

  interval: number;

  reset(): void;
}

export function getCounter(): Counter {
  const counter = function (start: number): void {
    // for avoid inspection
    start.toString().substr(0, 0);
    counter.interval = start;
  } as Counter;
  counter.interval = 123;
  counter.reset = function (): void {
    this.interval = 0;
  };
  return counter;
}

export interface EchoInterface {
  <T>(value: T): T;
}
