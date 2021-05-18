export function createPatchFunction (backend) {

  // ...

  /* 创建移除监听器回调 */
  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        // 移除节点
        removeNode(childElm)
      }
    }
    remove.listeners = listeners
    return remove
  }

  // ...

}
