export function buildNameRegular(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName;
}

export function buildNameOptional(firstName: string, lastName?: string): string {
  if (lastName) return firstName + ' ' + lastName;
  return firstName;
}

// "Smith" indicates that lastName's type is string
export function buildNameDefault(firstName: string, lastName = 'Smith'): string {
  return firstName + ' ' + lastName;
}

// default-initialized parameters don’t need to occur after required parameters.
export function buildNameDefaultParameterCanBeAtFirst(firstName = 'Will', lastName: string): string {
  return firstName + ' ' + lastName;
}

export function buildNameRest(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ');
}

export interface Card {
  suit: string;
  card: number;
}

export interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

// functions also support overloading, check official doc for more info.
