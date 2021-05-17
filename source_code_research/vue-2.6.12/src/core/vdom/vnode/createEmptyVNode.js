// 注释节点

export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text       // 文本内容
  node.isComment = true  // 标记为注释
  return node
}
