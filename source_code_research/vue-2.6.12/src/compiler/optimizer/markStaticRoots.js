

function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    // 静态节点 / v-once 即诶单
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }

    // 允许本身静态而子节点为动态
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }

    // 递归标记子节点
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    // 递归标记条件编译子节点
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}