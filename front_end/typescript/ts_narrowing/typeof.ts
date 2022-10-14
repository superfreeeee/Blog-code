{
  const n = typeof 123;
  const s = typeof '123';
  const b = typeof true;
  const sy = typeof Symbol();
  // const n: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

  function printAll(strs: string | string[] | null) {
    if (typeof strs === 'object') {
      strs; // strs: string[] | null
    } else if (typeof strs === 'string') {
      strs; // strs: string
    } else {
      // do nothing
    }
  }
}
