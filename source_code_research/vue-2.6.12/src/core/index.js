// 从 /src/instance/index 引入 Vue 类型
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

/* 初始化全局 API */
initGlobalAPI(Vue)

// 注入 Vue.prototyp.$isServer
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 注入 Vue.prototyp.$ssrContext
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// 注入 Vue.prototyp.FunctionalRenderContext
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

// 初始化静态变量 Vue.version
Vue.version = '__VERSION__'

export default Vue
