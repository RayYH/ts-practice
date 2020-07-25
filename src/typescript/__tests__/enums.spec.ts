import {
  BooleanLikeHeterogeneousEnum,
  Direction,
  FileAccess,
  respond,
  Response,
  showImportant,
  StringDirection,
} from '../enums';

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

test('string', () => {
  const dUp = StringDirection.Up;
  const dDown = StringDirection.Down;
  const dLeft = StringDirection.Left;
  const dRight = StringDirection.Right;
  expect(dUp).toEqual('UP');
  expect(dDown).toEqual('DOWN');
  expect(dLeft).toEqual('LEFT');
  expect(dRight).toEqual('RIGHT');
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

test('heterogeneous enums', () => {
  let e: BooleanLikeHeterogeneousEnum = BooleanLikeHeterogeneousEnum.No;
  expect(e).toEqual(0);
  e = BooleanLikeHeterogeneousEnum.Yes;
  expect(e).toEqual('YES');
});

test('keyof', () => {
  expect(showImportant('ERROR', 'error')).toEqual('ERROR 0 error');
  expect(showImportant('WARN', 'warn')).toEqual('WARN 1 warn');
  expect(showImportant('INFO', 'info')).toEqual('');
  expect(showImportant('DEBUG', 'debug')).toEqual('');
});

test('computed members', () => {
  let fileAccess: FileAccess = FileAccess.G;
  expect(fileAccess).toEqual(3);
  fileAccess = FileAccess.None;
  expect(fileAccess).toEqual(0);
  fileAccess = FileAccess.Read;
  expect(fileAccess).toEqual(2);
  fileAccess = FileAccess.Write;
  expect(fileAccess).toEqual(4);
  fileAccess = FileAccess.ReadWrite;
  // 2 | 4 = 0010 | 0100 = 0110 = 6
  expect(fileAccess).toEqual(6);
});

test('Union enums and enum member types', () => {
  enum ShapeKind {
    Circle,
    Square,
  }

  interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
  }

  interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
  }

  const c: Circle = {
    kind: ShapeKind.Circle,
    radius: 100,
  };

  const s: Square = {
    kind: ShapeKind.Square,
    sideLength: 100,
  };

  expect(c).not.toBeNull();
  expect(s).not.toBeNull();
});
