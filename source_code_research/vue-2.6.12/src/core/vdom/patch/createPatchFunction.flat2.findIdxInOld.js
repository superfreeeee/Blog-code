export function createPatchFunction (backend) {

  // ...

  /* 从旧数组中查找节点 */
  function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]
      if (isDef(c) && sameVnode(node, c)) return i
    }
  }

  // ...

}
