class Person {
  constructor(name: string, age: number) {}
}

type T19 = ConstructorParameters<typeof Person>;

type T15 = ConstructorParameters<ErrorConstructor>;
// type T15 = [message?: string]

type T16 = ConstructorParameters<FunctionConstructor>;
// type T16 = string[]

type T17 = ConstructorParameters<RegExpConstructor>;
// type T17 = [pattern: string | RegExp, flags?: string]

type T18 = ConstructorParameters<any>;
// type T18 = unknown[]

// type T19 = ConstructorParameters<Function>;
// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//   Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T19 = never
