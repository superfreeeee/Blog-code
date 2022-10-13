interface IFoo {
  s: string;
  n: number;
  b: boolean;
}

type IFooNoNum = Omit<IFoo, 'n'>;
