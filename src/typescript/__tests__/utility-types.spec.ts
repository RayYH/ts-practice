/**
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html
 */
test('Partial', () => {
  interface Todo {
    title: string;
    description: string;
  }

  // Partial means subtype of given type
  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): object {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
  };

  const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
  });

  expect(todo2).toEqual({
    title: 'organize desk',
    description: 'throw out trash',
  });
});

test('Readonly', () => {
  interface Todo {
    title: string;
  }

  // Readonly means cannot be reassigned.
  const todo: Readonly<Todo> = {
    title: 'Delete inactive users',
  };

  expect(todo.title).toEqual('Delete inactive users');
});

test('Record', () => {
  interface PageInfo {
    title: string;
  }

  type Page = 'homeKey' | 'aboutKey' | 'contactKey';

  // map the properties of a type to another type
  const x: Record<Page, PageInfo> = {
    aboutKey: { title: 'about' },
    contactKey: { title: 'contact' },
    homeKey: { title: 'home' },
  };

  expect(x).toEqual({
    aboutKey: { title: 'about' },
    contactKey: { title: 'contact' },
    homeKey: { title: 'home' },
  });
});

test('Pick', () => {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  // Pick<T,K> means picking the set of properties K from T
  type TodoPreview = Pick<Todo, 'title' | 'completed'>;

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  };

  expect(todo).toEqual({
    title: 'Clean room',
    completed: false,
  });
});

test('Omit', () => {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  // Omit<T,K> means picking all properties from T and then removing K
  type TodoPreview = Omit<Todo, 'description'>;

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  };

  expect(todo).toEqual({
    title: 'Clean room',
    completed: false,
  });
});

// Exclude<T,U> Constructs a type by excluding from T all properties that are assignable to U
// Extract<T,U> Constructs a type by extracting from T all properties that are assignable to U
// NonNullable<T> Constructs a type by excluding null and undefined from T
// Parameters<T> Constructs a tuple type of the types of the parameters of a function type T
// ConstructorParameters<T> The ConstructorParameters<T> type lets us extract all parameter types of a constructor function type
// ReturnType<T> Constructs a type consisting of the return type of function T.
// InstanceType<T> Constructs a type consisting of the instance type of a constructor function type T
// Required<T> Constructs a type consisting of all properties of T set to required
// ThisParameterType Extracts the type of the this parameter of a function type, or unknown if the function type has no this parameter
// OmitThisParameter Removes the ‘this’ parameter from a function type
// ThisType<T> This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type

test('OmitThisParameter', () => {
  function toHex(this: number): string {
    return this.toString(16);
  }
  const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
  expect(fiveToHex()).toEqual('5');
});

test('ThisType', () => {
  type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
  };

  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    const data: object = desc.data || {};
    const methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
  }

  const obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number): void {
        this.x += dx; // Strongly typed this
        this.y += dy; // Strongly typed this
      },
    },
  });

  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);
  expect(obj.x).toEqual(15);
  expect(obj.y).toEqual(25);
});
