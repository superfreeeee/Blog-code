export function createPatchFunction (backend) {

  // ...

  /* 移除节点并触发 remove 钩子 */
  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      // 存在 vnode.data
      let i
      const listeners = cbs.remove.length + 1
      if (isDef(rm)) {
        // 递归调用时记录事件监听器数量
        rm.listeners += listeners
      } else {
        // 直接移除事件监听器
        // directly removing
        rm = createRmCb(vnode.elm, listeners)
      }
      // 对组件(vnode.componentInstance._vnode.data)递归调用
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm)
      }
      // 调用 remove 钩子
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm)
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        // 调用 vnode.data.hook.remove 钩子
        i(vnode, rm)
      } else {
        // 或是调用 rm 移除节点
        rm()
      }
    } else {
      // 简单移除节点
      removeNode(vnode.elm)
    }
  }

  // ...

}
