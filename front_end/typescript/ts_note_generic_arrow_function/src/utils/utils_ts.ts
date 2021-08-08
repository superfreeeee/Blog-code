export function test1<T>(arg: T) {
  console.log('arg:', arg);
}

export const test2 = <T>(arg: T) => {
  console.log('arg:', arg);
};
