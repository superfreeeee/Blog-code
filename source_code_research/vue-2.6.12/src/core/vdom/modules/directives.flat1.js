/* @flow */

import { emptyNode } from 'core/vdom/patch'
import { resolveAsset, handleError } from 'core/util/index'
import { mergeVNodeHook } from 'core/vdom/helpers/index'

/* directives 模块(全局 Vue.directive 指令处理) */
export default {
  // 创建周期处理 directive 指令
  create: updateDirectives,
  // 更新周期处理 directive 指令
  update: updateDirectives,
  // 销毁周期处理 directive 指令
  destroy: function unbindDirectives (vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}

function updateDirectives (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode)
  }
}

function _update (oldVnode, vnode) {/* ... */}

const emptyModifiers = Object.create(null)

function normalizeDirectives (
  dirs: ?Array<VNodeDirective>,
  vm: Component
): { [key: string]: VNodeDirective } {/* ... */}

// 获取简单指令名
function getRawDirName (dir: VNodeDirective): string {/* ... */}

// 调用 vnode 生命周期钩子
function callHook (dir, hook, vnode, oldVnode, isDestroy) {/* ... */}
