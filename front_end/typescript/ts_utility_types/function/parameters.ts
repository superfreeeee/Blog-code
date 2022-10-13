declare function f1(arg: { a: number; b: string }): void;

{
  type T7 = Parameters<() => string>;
  // type T7 = []

  type T8 = Parameters<(s: string) => void>;
  // type T8 = [s: string]

  type T9 = Parameters<<T>(arg: T) => T>;
  // type T9 = [arg: unknown]

  type T10 = Parameters<typeof f1>;
  // type T10 = [arg: {
  //     a: number;
  //     b: string;
  // }]

  type T11 = Parameters<any>;
  // type T11 = unknown[]

  type T12 = Parameters<never>;
  // type T12 = never

  // type T13 = Parameters<string>;
  // Type 'string' does not satisfy the constraint '(...args: any) => any'.
  // type T13 = never

  // type T14 = Parameters<Function>;
  // Type 'Function' does not satisfy the constraint '(...args: any) => any'.
  // Type 'Function' provides no match for the signature '(...args: any): any'.
  // type T14 = never
}
