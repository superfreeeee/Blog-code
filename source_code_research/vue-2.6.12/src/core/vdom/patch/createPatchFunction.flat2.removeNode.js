export function createPatchFunction (backend) {

  // ...

  /* 移除旧节点 */
  function removeNode (el) {
    const parent = nodeOps.parentNode(el)
    // 使用 v-html / v-text 时不需要进行移除
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el)
    }
  }

  // ...

}
