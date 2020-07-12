import { Direction, respond, Response, showImportant } from '../enums';

test('numeric', () => {
  const rNo = Response.No;
  const rYes = Response.Yes;
  expect(rNo).toEqual(0);
  expect(rYes).toEqual(1);
  expect(respond('response: ', rNo)).toEqual('response: No');
  expect(respond('response: ', rYes)).toEqual('response: Yes');
  const dUp = Direction.Up;
  const dDown = Direction.Down;
  const dLeft = Direction.Left;
  const dRight = Direction.Right;
  expect(dUp).toEqual(1);
  expect(dDown).toEqual(2);
  expect(dLeft).toEqual(3);
  expect(dRight).toEqual(4);
  expect(Direction[dUp]).toEqual('Up');
  expect(Direction[dDown]).toEqual('Down');
  expect(Direction[dLeft]).toEqual('Left');
  expect(Direction[dRight]).toEqual('Right');
});

test('const enums', () => {
  const enum Directions {
    Up,
    Down,
    Left,
    Right,
  }
  const directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
  expect(directions).toEqual([0, 1, 2, 3]);
});

test('keyof', () => {
  expect(showImportant('ERROR', 'error')).toEqual('ERROR 0 error');
  expect(showImportant('WARN', 'warn')).toEqual('WARN 1 warn');
  expect(showImportant('INFO', 'info')).toEqual('');
  expect(showImportant('DEBUG', 'debug')).toEqual('');
});
