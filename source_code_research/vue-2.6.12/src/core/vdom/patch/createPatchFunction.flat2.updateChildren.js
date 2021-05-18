export function createPatchFunction (backend) {

  // ...

  /* 递归更新子数组(patchVnode 内部调用) */
  /**
   * case 1: 旧头 & 新头相同 -> 递归 patch
   * case 2: 旧尾 & 新尾相同 -> 递归 patch
   * case 3: 旧头 & 新尾相同 -> 递归 patch
   * case 4: 旧尾 & 新头相同 -> 递归 patch
   * case 5: 按序查找并更新节点
   */

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly 作用于特殊标签 <transition-group>
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        // 旧节点 moveTo 最左侧 -> 直接跳过找下一个
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left

      } else if (isUndef(oldEndVnode)) {
        // 旧节点 moveTo 最右侧 -> 直接跳过找前一个
        oldEndVnode = oldCh[--oldEndIdx]

      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        /* case 1: 旧头 & 新头相同 -> 递归 patch */
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]

      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        /* case 2: 旧尾 & 新尾相同 -> 递归 patch */
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]

      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        /* case 3: 旧头 & 新尾相同 -> 递归 patch */
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        // 更新后旧节点 moveTo 未处理节点最右侧
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]

      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        /* case 4: 旧尾 & 新头相同 -> 递归 patch */
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        // 更新后旧节点 moveTo 未处理节点最左侧
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]

      } else {
        /* case 5: 按序查找并更新节点 */

        // oldKeyToIdx 旧节点 key: index 的映射
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        // 查找新头在旧数组的 index
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) {
          // 旧数组中不存在 -> 新元素直接插入
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          // 旧数组中存在
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 递归更新子节点
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // 直接替换子节点
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        // 检查下一个新节点
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      // 新旧子节点数不对等 -> startIdx 越界 -> 插入将剩余新节点
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      // 移除剩余旧节点
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }

  // ...

}
