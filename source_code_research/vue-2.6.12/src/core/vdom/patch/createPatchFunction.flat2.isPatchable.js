export function createPatchFunction (backend) {

  // ...

  /* 检查是否有 tag(即 isRealElement) */
  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode
    }
    return isDef(vnode.tag)
  }

  // ...

}
