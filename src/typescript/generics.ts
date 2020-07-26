// This T allows us to capture the type the user provides
export function identity<T>(arg: T): T {
  return arg;
}

export function arrayLength<T>(arg: T[]): number {
  return arg.length;
}

export function identityArray<T>(arg: Array<T>): Array<T> {
  return arg;
}

export class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

export interface Lengthwise {
  length: number;
}

// generic constraints
export function loggingIdentity<T extends Lengthwise>(arg: T): number {
  return arg.length; // Now we know it has a .length property, so no more error
}

// For any type T, keyof T is the union of known, public property names of T.
export function getProperty<T, K extends keyof T>(obj: T, key: K): any {
  return obj[key];
}
