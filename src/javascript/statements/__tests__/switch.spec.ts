test('switch', () => {
  interface switchSpec {
    (expr: string): string;
  }
  const getPrice: switchSpec = function (expr: string): string {
    let res: string;
    switch (expr) {
      case 'Oranges':
        res = 'Oranges are $0.59 a pound.';
        break;
      case 'Mangoes':
      case 'Papayas':
        res = 'Mangoes and papayas are $2.79 a pound.';
        break;
      default:
        res = 'Sorry, we are out of ' + expr + '.';
        break;
    }

    return res;
  };

  expect(getPrice('Bananas')).toEqual('Sorry, we are out of Bananas.');
  expect(getPrice('Oranges')).toEqual('Oranges are $0.59 a pound.');
  expect(getPrice('Mangoes')).toEqual('Mangoes and papayas are $2.79 a pound.');
  expect(getPrice('Papayas')).toEqual('Mangoes and papayas are $2.79 a pound.');
});
