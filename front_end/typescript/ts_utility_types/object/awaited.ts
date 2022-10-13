type A = Awaited<Promise<string>>;
// type A = string
type B = Awaited<Promise<Promise<number>>>;
// type B = number
type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean
