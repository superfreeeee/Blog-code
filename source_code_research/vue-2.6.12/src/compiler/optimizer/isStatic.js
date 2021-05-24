/* 检查是否为静态节点 */
function isStatic (node: ASTNode): boolean {
  // 动态绑定节点
  if (node.type === 2) {
    return false
  }
  // 文本节点
  if (node.type === 3) {
    return true
  }
  return !!(node.pre || (  // v-pre
    !node.hasBindings &&  // 没有动态绑定 @ :
    !node.if && !node.for &&  // 没有 v-if v-for
    !isBuiltInTag(node.tag) &&  // 不是内置节点
    isPlatformReservedTag(node.tag) &&  // 不是组件
    !isDirectChildOfTemplateFor(node) &&  // 不是 template / v-for 的直接子节点
    Object.keys(node).every(isStaticKey)  // 只包含静态属性名
  ))
}