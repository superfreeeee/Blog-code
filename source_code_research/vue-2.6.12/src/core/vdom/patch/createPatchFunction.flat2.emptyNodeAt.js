export function createPatchFunction (backend) {

  // ...

  /* 创建并返回空节点 */
  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  // ...

}
