import { randomString } from '../utils/str';

// boolean
export function getBoolean(bool: boolean): boolean {
  const isBool: boolean = bool && true;
  return !isBool;
  // this func will always returns !isBool
}

// number
export function getNumber(type: string): number | bigint {
  let num: number | bigint;
  switch (type) {
    case 'dec':
      num = 6;
      break;
    case 'hex':
      num = 0xf00d; // 15*16^3+13 = 61453
      break;
    case 'bin':
      num = 0b1010; // 1*2+1*8 = 10
      break;
    case 'oct':
      num = 0o744; // 4+4*8+7*64 = 484
      break;
    case 'bigint':
      num = 100n;
      break;
    default:
      num = 0;
      break;
  }

  return num;
}

// string
export function getString(length: number): string {
  return randomString(length);
}

// template string
export function greeting(name: string, age?: number): string {
  if (age) {
    return `Hello, my name is ${name}.

I'll be ${age + 1} years old next year.`;
  }

  return `Hello, ${name}!`;
}

// array
export function getArray(type: string): any[] | { [index: number]: any } {
  const numberList: number[] = [1, 2, 3];
  const stringList: Array<string> = ['one', 'two', 'three'];

  // we can also use interface to declare an array
  interface Arr {
    [index: number]: any;
  }

  // is equivalent to `const anyList: any[] = [XXX, YYY, ZZZ]`
  const anyList: Arr = [1, true, 'free'];
  switch (type) {
    case 'number':
    default:
      return numberList;
    case 'string':
      return stringList;
    case 'any':
      return anyList;
  }
}

// tuple
export function getTuple([name, age]: [string, number]): string {
  const user: [string, number] = [name, age];
  return `${user[0]}'s age is ${user[1]}.`;
}

// enum
export function getEnum(): string {
  let str = '';

  enum Color {
    RED,
    GREEN,
    BLUE,
  }

  const red: Color = Color.RED;
  const green: Color = Color.GREEN;
  const blue: Color = Color.BLUE;

  str += `[${red} => ${Color[red]} ${green} => ${Color[green]} ${blue} => ${Color[blue]}]`;

  // with start index at 1
  enum ColorNew {
    RED = 1,
    GREEN,
    BLUE,
  }

  const redNew: ColorNew = ColorNew.RED;
  const greenNew: ColorNew = ColorNew.GREEN;
  const blueNew: ColorNew = ColorNew.BLUE;

  str += `[${redNew} => ${ColorNew[redNew]} ${greenNew} => ${ColorNew[greenNew]} ${blueNew} => ${ColorNew[blueNew]}]`;

  return str;
}

// other types
// void - as the return type of functions that do not return a value
// undefined - named undefined
// null - named null
// never - The never type represents the type of values that never occur.
// object - object is a type that represents the non-primitive type, check official doc.
