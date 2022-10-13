{
  type F1 = () => string;
  const f1 = () => '';

  type T1 = ReturnType<F1>;
  // type T1 = string
  type T2 = ReturnType<typeof f1>;
  // type T2 = string

  type F2 = (str: string) => number;
  const f2 = (str: string) => Number(str);

  type T3 = ReturnType<F2>;
  // type T3 = number
  type T4 = ReturnType<typeof f2>;
  // type T4 = number
}
