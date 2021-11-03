/**
 * 取消观察
 * @param element
 * @param target
 */
export function unobserveElement(element: Instance, target: TargetNode) {
  if (observerElementsMap.has(element.observer)) {
    const targets = observerElementsMap.get(element.observer);
    // observerElementsMap[observer].delete(element) 从缓存池移除
    if (targets?.delete(element)) {
      // observer.unobserve / observer.disconnect 取消观察/删除观察者对象
      if (targets.size > 0) {
        element.observer!.unobserve(target);
      } else {
        element.observer!.disconnect();
        observerElementsMap.delete(element.observer);
      }
    }
  }
}
