/* 获取前驱元素节点 */
function findPrevElement (children: Array<any>): ASTElement | void {
  let i = children.length
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      // text between v-if、v-else-if、v-else 节点
      children.pop()
    }
  }
}