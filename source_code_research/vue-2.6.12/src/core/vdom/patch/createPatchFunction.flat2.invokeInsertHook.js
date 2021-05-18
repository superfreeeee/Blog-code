export function createPatchFunction (backend) {

  // ...

  /* 触发 insert 钩子 */
  function invokeInsertHook (vnode, queue, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      // 维护子节点 insert 钩子调用顺序
      vnode.parent.data.pendingInsert = queue
    } else {
      for (let i = 0; i < queue.length; ++i) {
        // 调用 insert 钩子
        queue[i].data.hook.insert(queue[i])
      }
    }
  }

  // ...

}
