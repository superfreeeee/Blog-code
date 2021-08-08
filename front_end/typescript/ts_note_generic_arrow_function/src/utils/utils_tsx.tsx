export function test3<T>(arg: T) {
  console.log('arg:', arg);
}
export const test4 = <T,>(arg: T) => {
  console.log('arg:', arg);
};
