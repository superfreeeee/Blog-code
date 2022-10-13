{
  function f3(num: number) {}
  function f4(this: string, num: number) {}

  type T1 = OmitThisParameter<typeof f3>;
  // type T1 = (num: number) => void


  type T2 = OmitThisParameter<typeof f4>;
  // type T2 = (num: number) => void

  type n1 = T1;
  type n2 = T2;
}
