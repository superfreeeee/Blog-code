type ValueOf<T> = T[keyof T];

type ObserverProp = ValueOf<IntersectionObserverInit> | boolean; // boolean for the prop 'disabled'

/**
 * 浅比较
 *   等长数组 => 递归比较
 *   引用比较
 * @param next
 * @param prev
 * @returns
 */
export function shallowCompare(next: ObserverProp, prev: ObserverProp): boolean {
  if (Array.isArray(next) && Array.isArray(prev)) {
    if (next.length === prev.length) {
      return next.some((_, index) => shallowCompare(next[index], prev[index]));
    }
  }
  return next !== prev;
}
