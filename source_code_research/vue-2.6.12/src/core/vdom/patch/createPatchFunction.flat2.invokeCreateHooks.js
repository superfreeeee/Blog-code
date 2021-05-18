export function createPatchFunction (backend) {

  // ...

  /* 触发 create 钩子 */
  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    // 调用所有模块的 create 回调
    for (let i = 0; i < cbs.create.length; ++i) {
      cbs.create[i](emptyNode, vnode)
    }
    // 调用 vnode.data.hook 上的 create 钩子，并插入 insertedVnodeQueue 队列 
    i = vnode.data.hook
    if (isDef(i)) {
      if (isDef(i.create)) i.create(emptyNode, vnode)
      if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
    }
  }

  // ...

}
