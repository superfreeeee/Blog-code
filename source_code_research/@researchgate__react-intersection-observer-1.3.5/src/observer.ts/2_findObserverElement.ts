/**
 * 查找观察目标 element: Instance
 * @param observer
 * @param entry
 * @returns
 */
export function findObserverElement(observer: IntersectionObserver, entry: IntersectionObserverEntry) {
  const elements = observerElementsMap.get(observer);
  if (elements) {
    const values = elements.values();
    let element: Instance;
    while ((element = values.next().value)) {
      if (element.target === entry.target) {
        // observerElementsMap[observer].element: Instance
        return element;
      }
    }
  }
  return null;
}
