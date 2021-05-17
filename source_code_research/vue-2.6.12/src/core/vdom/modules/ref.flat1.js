/* @flow */

import { remove, isDef } from 'shared/util'

/* ref 模块(ref 引用属性处理) */
export default {
  // 创建周期处理 ref 引用
  create (_: any, vnode: VNodeWithData) {
    registerRef(vnode)
  },
  // 更新周期处理 ref 引用
  update (oldVnode: VNodeWithData, vnode: VNodeWithData) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true)
      registerRef(vnode)
    }
  },
  // 销毁周期处理 ref 引用
  destroy (vnode: VNodeWithData) {
    registerRef(vnode, true)
  }
}

/* 注册 ref 引用 */
export function registerRef (vnode: VNodeWithData, isRemoval: ?boolean) {/* ... */}
