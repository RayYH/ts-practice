import {
  buildNameDefault,
  buildNameDefaultParameterCanBeAtFirst,
  buildNameOptional,
  buildNameRegular,
  buildNameRest,
  Card,
  Deck,
} from '../functions';

test('regular', () => {
  const res = buildNameRegular('Bob', 'Adams');
  expect(res).toEqual('Bob Adams');
});

test('optional', () => {
  let res = buildNameOptional('Bob');
  expect(res).toEqual('Bob');
  res = buildNameOptional('Bob', 'Adams');
  expect(res).toEqual('Bob Adams');
});

test('default', () => {
  let res = buildNameDefault('Bob', 'Adams');
  expect(res).toEqual('Bob Adams');
  res = buildNameDefault('Bob');
  expect(res).toEqual('Bob Smith');
});

test('default parameter location', () => {
  let res = buildNameDefaultParameterCanBeAtFirst('Bob', 'Adams');
  expect(res).toEqual('Bob Adams');
  // need to explicitly pass undefined to get the default initialized value.
  res = buildNameDefaultParameterCanBeAtFirst(undefined, 'Smith');
  expect(res).toEqual('Will Smith');
});

test('rest', () => {
  const res = buildNameRest('Joseph', 'Samuel', 'Lucas', 'Bob');
  expect(res).toEqual('Joseph Samuel Lucas Bob');
});

test('this', () => {
  const deck: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
      return (): Card => {
        const pickedCard = Math.floor(Math.random() * 52);
        const pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  const cardPicker = deck.createCardPicker();
  const pickedCard = cardPicker();
  expect(pickedCard.card).not.toBeNull();
  expect(pickedCard.suit).not.toBeNull();
});

test('overload', () => {
  function dump(value: string): string;
  function dump(value: number): number;
  function dump(value: string | number): string | number {
    return value;
  }
  expect(dump(1)).toEqual(1);
  expect(dump('1')).toEqual('1');
});
