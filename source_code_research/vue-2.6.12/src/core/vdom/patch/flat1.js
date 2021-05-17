// 虚拟 dom 比较算法

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

export const emptyNode = new VNode('', {}, [])

// 生命周期钩子
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

/* 比较节点 */
function sameVnode (a, b) {/* ... */}

/* 比较输入类型 */
function sameInputType (a, b) {/* ... */}

/* 建立 key: index 的映射 */
function createKeyToOldIdx (children, beginIdx, endIdx) {/* ... */}

/* 生成 patch 函数 */
export function createPatchFunction (backend) {/* ... */}
  