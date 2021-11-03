/**
 * 观察目标
 * @param element
 * @param callback
 * @param options
 * @returns
 */
export function observe(element: Element, callback: ObserverInstanceCallback, options: IntersectionObserverInit = {}) {
  // 无目标
  if (!element) return () => {};

  // 按 options 获取 observer 实例
  const { id, observer, elements } = createObserver(options);

  // 注册回调函数
  let callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }

  callbacks.push(callback);
  observer.observe(element); // 观察目标

  // 返回卸载方法
  return function unobserve() {
    // 从记录中移除
    callbacks.splice(callbacks.indexOf(callback), 1);

    // 一个 element 对应一个 callback 列表
    if (callbacks.length === 0) {
      // callbacks 为空
      elements.delete(element);
      observer.unobserve(element);
    }

    if (elements.size === 0) {
      // elements 为空
      observer.disconnect();
      ObserverMap.delete(id);
    }
  };
}
