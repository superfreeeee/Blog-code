export function createPatchFunction (backend) {

  // ...

  /* 设置 CSS scoped id */
  function setScope (vnode) {
    let i
    if (isDef(i = vnode.fnScopeId)) {
      // 设置该节点的 scopeId
      nodeOps.setStyleScope(vnode.elm, i)
    } else {
      // 递归查找父节点的 scopeId
      let ancestor = vnode
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i)
        }
        ancestor = ancestor.parent
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    // 为 slot 元素也设置 scopeId
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i)
    }
  }

  // ...

}
