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

export function createPatchFunction (backend) {

  // ...

  /* 比较虚拟 dom 差异并返回合并后节点 */
  /**
   * case 1: 销毁节点
   * case 2: 新增节点
   * case 3: 深度 patch
   * case 4: 直接替换策略(服务端渲染 || hydrating === true)
   * case 5: 以新节点替换旧节点
   */
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      /* case 1: oldVnode 存在、vnode 不存在 -> 销毁节点 */
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      /* case 2: oldVnode 不存在 -> 新增节点(首次渲染节点) */
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        /* case 3: oldVnode.nodeType 存在 && 新旧节点一样 -> 深度比较根节点差异 */
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            /* case 4: 服务端渲染直接强制替换旧节点 */
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            // 4.1 hydrating === true -> 直接替换旧节点策略
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              // 4.2 client-side render with hydrating === true warning ...
            }
          }
          // !4.1 hydrating 失败 -> 返回缺失节点
          oldVnode = emptyNodeAt(oldVnode)
        }
        /* case 5: 默认策略 -> 以新节点替换旧节点 */

        // 替换已存在 elm
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)

        // 创建新节点
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        // 如果父节点存在，递归替换位于父节点的位置
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
            // 首先调用父节点所有 destroy 钩子
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            // 放入新节点
            ancestor.elm = vnode.elm
            if (patchable) {
              /* 实节点 */
              // 调用所有 create 钩子
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }

              // 调用所有 data.hook.insert.fns 钩子              
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              /* 虚节点 */
              // 仅记录 ref
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }

        // 销毁旧节点
        if (isDef(parentElm)) {
          // 父节点存在则移除旧节点即可
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          // 触发旧节点的 destroy 生命周期钩子
          invokeDestroyHook(oldVnode)
        }
      }
    }

    // 触发新节点的 insert 生命周期钩子
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }

  // ...

}
