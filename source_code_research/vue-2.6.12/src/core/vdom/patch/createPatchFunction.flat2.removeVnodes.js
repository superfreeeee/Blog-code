export function createPatchFunction (backend) {

  // ...

  /* 直接移除剩余旧节点 */
  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          // realElement: removeNode 并调用 remove & destroy 钩子
          removeAndInvokeRemoveHook(ch)
          invokeDestroyHook(ch)
        } else { // Text node
          // 非 realElement: 直接调用 removeNode
          removeNode(ch.elm)
        }
      }
    }
  }

  // ...

}
