/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
/* 从元素获取最近的实例 */
function getClosestInstanceFromNode(node) {
  // 从当前节点上获取
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  // 向上走(向祖先元素依序回溯)
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest;
  var inst;
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    // 离栈底越近则为越靠近的实例
    closest = inst;
    if (parents.length) {
      // 依序缓存
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}