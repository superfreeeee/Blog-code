/* ReactDOM.render 原始方法 */
export function render(
  element: React$Element<any>,
  container: Container,
  callback: ?Function,
) {
  // 验证容器元素
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );

  // 测试用
  if (__DEV__) {
    const isModernRoot =
      isContainerMarkedAsRoot(container) &&
      container._reactRootContainer === undefined;
    if (isModernRoot) {
      console.error(
        'You are calling ReactDOM.render() on a container that was previously ' +
          'passed to ReactDOM.createRoot(). This is not supported. ' +
          'Did you mean to call root.render(element)?',
      );
    }
  }

  // 将元素渲染到容器内
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}