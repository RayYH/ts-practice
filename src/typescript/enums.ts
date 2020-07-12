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

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export function showImportant(key: keyof typeof LogLevel, message: string): string {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    return key + ' ' + num + ' ' + message;
  }

  return '';
}
