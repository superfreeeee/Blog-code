/* @flow */

import { isIE, isIE9, isEdge } from 'core/util/env'

import {
  extend,
  isDef,
  isUndef
} from 'shared/util'

import {
  isXlink,
  xlinkNS,
  getXlinkProp,
  isBooleanAttr,
  isEnumeratedAttr,
  isFalsyAttrValue,
  convertEnumeratedValue
} from 'web/util/index'

/* 更新节点属性 */
function updateAttrs (oldVnode: VNodeWithData, vnode: VNodeWithData) {/* ... */}

/* 设置属性 */
function setAttr (el: Element, key: string, value: any) {/* ... */}

/* 基础属性设置 */
function baseSetAttr (el, key, value) {/* ... */}

/* platformModules.attrs 模块(处理节点属性) */
export default {
  create: updateAttrs,
  update: updateAttrs
}
