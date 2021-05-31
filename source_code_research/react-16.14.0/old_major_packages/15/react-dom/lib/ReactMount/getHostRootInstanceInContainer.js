/* 从容器获取宿主根元素实例 */
function getHostRootInstanceInContainer(container) {
  var rootEl = getReactRootElementInContainer(container);
  // 获取元素渲染实例 component._renderedComponent
  var prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl);
  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
}