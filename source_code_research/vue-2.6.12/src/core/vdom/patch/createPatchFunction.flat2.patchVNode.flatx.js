export function createPatchFunction (backend) {

  // ...

  /* 比较新旧节点差异并更新 */
  /**
   * case 1: 新旧节点相等 -> 直接返回
   * case 2: vnode.asyncFactory.resolved === true -> hydrate 快速创建直接替换
   * case 3: 新旧都是静态节点 -> 直接复用旧节点
   * case 4~7 非文本节点
   *   case 4: 比较并更新子节点数组
   *   case 5: 旧节点无子节点 -> 直接插入子节点数组
   *   case 6: 新节点无子节点 -> 移除旧子节点数组
   *   case 7: 旧节点存在文本内容 -> 节点文本置为空
   * case 8: 文本节点 -> 直接替换内容
   */
  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      /* case 1: 新旧节点相等 -> 直接返回 */
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // 克隆数组中节点
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = vnode.elm = oldVnode.elm

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        /* case 2: vnode.asyncFactory.resolved === true -> hydrate 快速创建直接替换 */
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
      } else {
        vnode.isAsyncPlaceholder = true
      }
      return
    }

    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      /* case 3: 新旧都是静态节点 -> 直接复用旧节点 */
      vnode.componentInstance = oldVnode.componentInstance
      return
    }

    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      // 根据 vnode.data.hook.prepatch 钩子
      i(oldVnode, vnode)
    }

    const oldCh = oldVnode.children
    const ch = vnode.children
    if (isDef(data) && isPatchable(vnode)) {
      // 调用所有 update 钩子
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      // 调用 data.hook.update 钩子
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) {
      // 非文本节点
      if (isDef(oldCh) && isDef(ch)) {
        /* case 4: 比较并更新子节点数组 */
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        /* case 5: 旧节点无子节点 -> 直接插入子节点数组 */
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        /* case 6: 新节点无子节点 -> 移除旧子节点数组 */
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        /* case 7: 旧节点存在文本内容 -> 节点文本置为空 */
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      /* case 8: 文本节点 -> 直接替换内容 */
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      // 调用 vnode.data.hook.postpatch 钩子
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }

  // ...

}
