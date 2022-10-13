{
  class A {}

  type T0 = typeof A;
  type T1 = InstanceType<typeof A>;
  // type T1 = any

  interface B {
    new (tag: string): number;
  }

  type T2 = InstanceType<B>;
  // type T2 = number
}
