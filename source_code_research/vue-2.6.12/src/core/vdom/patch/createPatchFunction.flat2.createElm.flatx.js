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

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // 已经渲染过的需要创建克隆节点，否则比较时对树遍历会出问题
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    vnode.isRootInsert = !nested  // 检查是否为
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      // 作为组件节点时直接返回
      return
    }

    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) {
      /* 一般元素节点(Element) */

      // unknown element warning ...

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      setScope(vnode)

      if (__WEEX__) {
        /* weex environment ... */
      } else {
        // 创建子节点
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          // 触发 create 钩子
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        // 插入父节点
        insert(parentElm, vnode.elm, refElm)
      }

      // creatingElmInVPre update(in production) ...
    } else if (isTrue(vnode.isComment)) {
      /* 注释节点(Comment) */
      vnode.elm = nodeOps.createComment(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    } else {
      /* 文本节点(Text) */
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }

  // ...

}