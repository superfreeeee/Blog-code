/* @flow */

import {
  isDef,
  isUndef
} from 'shared/util'

import {
  concat,
  stringifyClass,
  genClassForVnode
} from 'web/util/index'

/* 更新 class 属性 */
function updateClass (oldVnode: any, vnode: any) {/* ... */}

/* platformModules.class 模块(处理节点 class 属性) */
export default {
  create: updateClass,
  update: updateClass
}
