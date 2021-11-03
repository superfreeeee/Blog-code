/**
 * 观察目标
 * @param element
 */
export function observeElement(element: Instance) {
  if (element.observer && !observerElementsMap.has(element.observer)) {
    observerElementsMap.set(element.observer, new Set<Instance>());
  }
  // observerElementsMap[observer].add(element) 加入缓存池
  observerElementsMap.get(element.observer)?.add(element);
  // observer.observe(element.target) 观察实例
  element.observer!.observe(element.target!);
}
