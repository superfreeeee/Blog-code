export const observerElementsMap = new Map<IntersectionObserver | undefined, Set<Instance>>();

/**
 * 获取 IntersectionObserver 实例
 * @param options
 * @returns
 */
export function getPooled(options: IntersectionObserverInit = {}) {
  // 参数处理
  const root = options.root || null;
  const rootMargin = parseRootMargin(options.rootMargin);
  const threshold = Array.isArray(options.threshold)
    ? options.threshold
    : [options.threshold != null ? options.threshold : 0];

  // 查找符合条件的实例
  const observers = observerElementsMap.keys();
  let observer;
  while ((observer = observers.next().value)) {
    const unmatched =
      root !== observer.root || rootMargin !== observer.rootMargin || shallowCompare(threshold, observer.thresholds);

    if (!unmatched) {
      return observer;
    }
  }
  return null;
}
