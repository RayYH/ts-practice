// Enums allow a developer to define a set of named constants.
// TypeScript provides both numeric and string-based enums.
export enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

export enum Response {
  No,
  Yes,
}

export function respond(recipient: string, response: Response): string {
  return recipient + Response[response];
}

// In a string enum, each member has to be constant-initialized with a string literal,
// or with another string enum member.
export enum StringDirection {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}

// use keyof typeof to get a Type that represents all Enum keys as strings
export function showImportant(key: keyof typeof LogLevel, message: string): string {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    return key + ' ' + num + ' ' + message;
  }

  return '';
}

export enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length,
}
