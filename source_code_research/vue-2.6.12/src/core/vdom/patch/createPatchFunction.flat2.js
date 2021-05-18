import VNode, { cloneVNode } from './vnode'
import config from '../config'
import { SSR_ATTR } from 'shared/constants'
import { registerRef } from './modules/ref'
import { traverse } from '../observer/traverse'
import { activeInstance } from '../instance/lifecycle'
import { isTextInputType } from 'web/util/element'

import {
  warn,
  isDef,
  isUndef,
  isTrue,
  makeMap,
  isRegExp,
  isPrimitive
} from '../util/index'

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

  /* 移除旧节点 */
  function removeNode (el) {/* ... */}

  function isUnknownElement (vnode, inVPre) {/* ... */}

  let creatingElmInVPre = 0

  /* 创建元素 */
  function createElm (/* ... */) {/* ... */}

  /* 创建组件(子组件) */
  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {/* ... */}

  /* 初始化组件(初始化 data, create 钩子, CSS scopeId, ref) */
  function initComponent (vnode, insertedVnodeQueue) {/* ... */}

  /* 激活已创建组件节点 */
  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {/* ... */}

  /* 将 elm 插入 parent(插到 ref 前 or 直接插入) */
  function insert (parent, elm, ref) {/* ... */}

  /* 递归创建子节点 */
  function createChildren (vnode, children, insertedVnodeQueue) {/* ... */}

  /* 检查是否有 tag(即 isRealElement) */
  function isPatchable (vnode) {/* ... */}

  /* 触发 create 钩子 */
  function invokeCreateHooks (vnode, insertedVnodeQueue) {/* ... */}

  /* 设置 CSS scoped Id */
  function setScope (vnode) {/* ... */}

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {/* ... */}

  /* 触发 destroy 钩子 */
  function invokeDestroyHook (vnode) {/* ... */}

  function removeVnodes (vnodes, startIdx, endIdx) {/* ... */}

  function removeAndInvokeRemoveHook (vnode, rm) {/* ... */}

  /* 递归更新子数组(patchVnode 内部调用) */
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {/* ... */}

  /* 检查子节点是否存在重复 key */
  function checkDuplicateKeys (children) {/* ... */}

  /* 从旧数组中查找节点 */
  function findIdxInOld (node, oldCh, start, end) {/* ... */}

  /* 比较新旧节点差异并更新 */
  function patchVnode (/* ... */) {/* ... */}


  function invokeInsertHook (vnode, queue, initial) {/* ... */}

  let hydrationBailed = false

  const isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key')

  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {/* ... */}

  function assertNodeMatch (node, vnode, inVPre) {/* ... */}

  return function patch (oldVnode, vnode, hydrating, removeOnly) {/* ... */}
}
  