export function createPatchFunction (backend) {

  // ...

  /* 触发 destroy 钩子 */
  function invokeDestroyHook (vnode) {
    let i, j
    const data = vnode.data
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
      // 调用所有 destroy 钩子并传入 vnode
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        // 递归触发子节点的 destroy 钩子
        invokeDestroyHook(vnode.children[j])
      }
    }
  }

  // ...

}
