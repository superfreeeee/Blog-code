export function createPatchFunction (backend) {

  // ...

  /* 创建组件节点 */
  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    // 有数据项
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        // 调用 init 钩子
        i(vnode, false /* hydrating */)
      }

      // 如果 Vue 实例已经存在(表示当前为组件节点)
      if (isDef(vnode.componentInstance)) {
        // 初始化子节点组件
        initComponent(vnode, insertedVnodeQueue)
        // 将子组件插入父节点
        insert(parentElm, vnode.elm, refElm)
        if (isTrue(isReactivated)) {
          // 激活组件
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }

  // ...

}
