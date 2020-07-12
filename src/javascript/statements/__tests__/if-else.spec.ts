test('if else', () => {
  function getMessage(value: number): string {
    if (value > 5) {
      return 'given value is greater than 5';
    } else {
      return 'given value is less than or equal to 5';
    }
  }

  expect(getMessage(4)).toEqual('given value is less than or equal to 5');
  expect(getMessage(6)).toEqual('given value is greater than 5');
});
