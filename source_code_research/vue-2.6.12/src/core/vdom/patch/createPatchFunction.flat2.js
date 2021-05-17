// vnode 生命周期钩子
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

/* 生成 patch 函数 */
export function createPatchFunction (backend) {

  // 收集 vnode 生命周期相关回调
  let i, j
  const cbs = {}

  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  function emptyNodeAt (elm) {/* ... */}

  function createRmCb (childElm, listeners) {/* ... */}

  function removeNode (el) {/* ... */}

  function isUnknownElement (vnode, inVPre) {/* ... */}

  let creatingElmInVPre = 0

  /* 创建元素 */
  function createElm (/* ... */) {/* ... */}

  /* 创建组件(子组件) */
  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {/* ... */}

  function initComponent (vnode, insertedVnodeQueue) {/* ... */}

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {/* ... */}

  function insert (parent, elm, ref) {/* ... */}

  function createChildren (vnode, children, insertedVnodeQueue) {/* ... */}

  /* 检查是否有 tag(即 isRealElement) */
  function isPatchable (vnode) {/* ... */}

  function invokeCreateHooks (vnode, insertedVnodeQueue) {/* ... */}

  /* 设置 CSS scoped id */
  function setScope (vnode) {/* ... */}

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {/* ... */}

  function invokeDestroyHook (vnode) {/* ... */}

  function removeVnodes (vnodes, startIdx, endIdx) {/* ... */}


  function removeAndInvokeRemoveHook (vnode, rm) {/* ... */}

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {/* ... */}

  function checkDuplicateKeys (children) {/* ... */}

  function findIdxInOld (node, oldCh, start, end) {/* ... */}

  function patchVnode (/* ... */) {/* ... */}


  function invokeInsertHook (vnode, queue, initial) {/* ... */}

  let hydrationBailed = false

  const isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key')

  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {/* ... */}

  function assertNodeMatch (node, vnode, inVPre) {/* ... */}

  return function patch (oldVnode, vnode, hydrating, removeOnly) {/* ... */}
}
  