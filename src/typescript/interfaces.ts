interface LabeledValue {
  label: string;
}

export function checkLabel(labelObj: LabeledValue): string {
  return labelObj.label;
}

interface SquareConfig {
  color?: string;
  width?: number;

  // could also have any number of other properties
  [propName: string]: any;
}

export function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface SearchFunc {
  (source: string, subString: string): boolean;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  currentTime: Date;
  tick(): string;
}

export function createClock(constructor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new constructor(hour, minute);
}

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

export default { checkLabel, createSquare, createClock };
