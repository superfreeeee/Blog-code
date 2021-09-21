// To avoid a cyclic dependency, we create the final class in this module
/* 创建 React 节点包装类 */
var ReactCompositeComponentWrapper = function (element) {
  this.construct(element);
};