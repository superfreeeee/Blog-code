export function createPatchFunction (backend) {

  // ...

  /* 将节点插入父节点 */
  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
          // elm 插到 ref 之前
          nodeOps.insertBefore(parent, elm, ref)
        }
      } else {
        // elm 直接插入 parent
        nodeOps.appendChild(parent, elm)
      }
    }
  }

  // ...

}
