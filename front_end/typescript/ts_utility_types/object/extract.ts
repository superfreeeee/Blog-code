type Nums = 1 | 2 | 3 | 4 | 5;
type Odds = 1 | 3 | 5 | 7 | 9;

type T3 = Extract<Nums, Odds>;
// type T3 = 1 | 3 | 5
type T4 = Extract<string | number | (() => void) | (() => number), Function>;
