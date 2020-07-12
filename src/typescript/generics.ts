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

export function getProperty<T, K extends keyof T>(obj: T, key: K): any {
  return obj[key];
}

export default { identity, identityArray, arrayLength, GenericNumber, loggingIdentity, getProperty };
