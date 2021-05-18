export function createPatchFunction (backend) {

  // ...

  /* 初始化组件(初始化 data, create 钩子, CSS scopeId, ref) */
  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      // 缓冲 data 队列(确保多层组件的 data 初始化顺序)
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
      vnode.data.pendingInsert = null
    }
    vnode.elm = vnode.componentInstance.$el
    if (isPatchable(vnode)) {
      // 调用组件的 create 钩子，并设置 CSS scopeId
      invokeCreateHooks(vnode, insertedVnodeQueue)
      setScope(vnode)
    } else {
      // 重新注册 ref
      registerRef(vnode)
      insertedVnodeQueue.push(vnode)
    }
  }

  // ...

}
