type tuple1 = [number, string, () => void];
type tuple2 = [string, string, number];
type tuple3 = [...tuple1, ...tuple2];

function add(x: number, y: number): number {
  return x + y;
}

type AddFn = typeof add;
type AddParams = Parameters<typeof add>;

function curriedAdd(adder: number, ...others: AddParams) {}
