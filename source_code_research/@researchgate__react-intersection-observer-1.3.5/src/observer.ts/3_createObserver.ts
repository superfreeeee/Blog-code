/**
 * 固定回调函数引用
 *   使用 findObserverElement 动态查找响应元素
 * @param entries
 * @param observer
 */
export function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  for (let i = 0; i < entries.length; i++) {
    const element = findObserverElement(observer, entries[i]);
    if (element) {
      element.handleChange(entries[i]);
    }
  }
}

/**
 * 创建/缓存实例
 * @param options
 * @returns
 */
export function createObserver(options: IntersectionObserverInit): IntersectionObserver {
  const pooled = getPooled(options);

  if (pooled) {
    return pooled;
  }

  const observer = new IntersectionObserver(callback, options);
  observerElementsMap.set(observer, new Set<Instance>());
  return observer;
}
