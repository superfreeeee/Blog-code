/* 标记静态根节点 */
function markStatic (node: ASTNode) {
  // 检查并标记是否为静态节点
  node.static = isStatic(node)

  if (node.type === 1) {
    // 避开 slot 节点
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }

    // 递归标记子节点
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        // 存在非静态子节点
        node.static = false
      }
    }

    // 递归条件编译子节点
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}