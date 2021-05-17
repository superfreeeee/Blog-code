// 文本节点

export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val)) // 纯内容
}