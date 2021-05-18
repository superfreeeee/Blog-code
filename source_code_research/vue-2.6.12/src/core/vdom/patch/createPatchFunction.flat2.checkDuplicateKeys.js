export function createPatchFunction (backend) {

  // ...

  /* 检查子节点是否存在重复 key */
  function checkDuplicateKeys (children) {
    const seenKeys = {}
    for (let i = 0; i < children.length; i++) {
      const vnode = children[i]
      const key = vnode.key
      if (isDef(key)) {
        if (seenKeys[key]) {
          // duplicate keys in children
        } else {
          seenKeys[key] = true
        }
      }
    }
  }

  // ...

}
