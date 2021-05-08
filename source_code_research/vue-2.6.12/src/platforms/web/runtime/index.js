/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// 挂载运行时环境相关工具
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// 添加命令、组件扩展
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// 注入 Vue.prototype.__patch__ 实例更新方法
Vue.prototype.__patch__ = inBrowser ? patch : noop

// 注入 Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// web 版本提示：devtools、development
if (inBrowser) {
  setTimeout(() => {
    // vue devtools info ...
    // development info ...
  }, 0)
}

export default Vue
