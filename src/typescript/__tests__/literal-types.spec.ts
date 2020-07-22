test('literal narrowing', () => {
  // TypeScript sets the type to be "Hello World" not string
  const helloWorld = 'Hello World';
  // the compiler declares hiWorld a string
  const hiWorld = 'Hi World';
  expect(helloWorld).toEqual('Hello World');
  expect(hiWorld).toEqual('Hi World');
});

test('string literal types', () => {
  type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

  class UIElement {
    animate(dx: number, dy: number, easing: Easing): string {
      if (easing === 'ease-in') {
        return 'in';
      } else if (easing === 'ease-out') {
        return 'out';
      } else if (easing === 'ease-in-out') {
        return 'in-out';
      } else {
        // It's possible that someone could reach this
        // by ignoring your types though.
        return 'invalid';
      }
    }
  }

  const button = new UIElement();
  expect(button.animate(0, 0, 'ease-in')).toEqual('in');

  // tagName can only be "a" or "div"
  function getTagName(tagName: 'a' | 'div'): string {
    return tagName;
  }

  expect(getTagName('a')).toEqual('a');
});

test('numeric literal types', () => {
  function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
  }

  const result = rollDice();
  expect(result).toBeLessThanOrEqual(6);
  expect(result).toBeGreaterThanOrEqual(1);

  interface MapConfig {
    lng: number;
    lat: number;
    tileSize: 8 | 16 | 32;
  }

  const mapConfig: MapConfig = { lng: -73.935242, lat: 40.73061, tileSize: 16 };
  expect(mapConfig).not.toBeNull();
});
