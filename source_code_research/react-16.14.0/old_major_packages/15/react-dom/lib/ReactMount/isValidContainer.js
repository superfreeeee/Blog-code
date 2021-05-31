/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */
/* 校验 DOM 元素容器 */
function isValidContainer(node) {
  return !!(node &&
    (node.nodeType === ELEMENT_NODE_TYPE ||
      node.nodeType === DOC_NODE_TYPE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE));
}