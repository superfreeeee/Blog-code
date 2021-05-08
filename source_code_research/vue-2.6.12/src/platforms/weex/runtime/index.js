/* @flow */

import Vue from 'core/index'
import { patch } from 'weex/runtime/patch'
import { mountComponent } from 'core/instance/lifecycle'
import platformDirectives from 'weex/runtime/directives/index'
import platformComponents from 'weex/runtime/components/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isRuntimeComponent,
  isUnknownElement
} from 'weex/util/element'

// 挂载运行时环境相关工具
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isRuntimeComponent = isRuntimeComponent
Vue.config.isUnknownElement = isUnknownElement

// 挂载运行时环境相关工具命令 & 控件
Vue.options.directives = platformDirectives
Vue.options.components = platformComponents

// 注入 Vue.prototype.__patch__ 实例更新方法
Vue.prototype.__patch__ = patch

// 注入 Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: any,
  hydrating?: boolean
): Component {
  return mountComponent(
    this,
    el && query(el, this.$document),
    hydrating
  )
}

export default Vue
