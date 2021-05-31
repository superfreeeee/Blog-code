var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;

/**
 * Check if a given node should be cached.
 */
/* 检查是否需要缓存节点 */
function shouldPrecacheNode(node, nodeID) {
  return node.nodeType === 1 &&
    node.getAttribute(ATTR_NAME) === String(nodeID) || node.nodeType === 8 &&
    node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 &&
    node.nodeValue === ' react-empty: ' + nodeID + ' ';
}