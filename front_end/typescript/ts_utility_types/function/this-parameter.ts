{
  function f1(num: number) {}
  function f2(this: string, num: number) {}

  type T1 = ThisParameterType<typeof f1>;
  // type T1 = unknown

  type T2 = ThisParameterType<typeof f2>;
  // type T2 = string

  type n1 = T1;
  type n2 = T2;
}
