export function createPatchFunction (backend) {

  // ...

  /* 激活已创建组件节点 */
  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i
    let innerNode = vnode
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          // 调用所有 activate 钩子
          cbs.activate[i](emptyNode, innerNode)
        }
        insertedVnodeQueue.push(innerNode)
        break
      }
    }
    // reactivated 元素需要主动插入到父节点
    insert(parentElm, vnode.elm, refElm)
  }

  // ...

}
