/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */
/* 缓存节点实例 */
function precacheNode(inst, node) {
  var hostInst = getRenderedHostOrTextFromComponent(inst);
  hostInst._hostNode = node;
  node[internalInstanceKey] = hostInst;
}