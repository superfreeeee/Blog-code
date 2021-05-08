// 从 /src/instance/index 引入 Vue 类型
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

/* 初始化全局 API */
initGlobalAPI(Vue)

// ...

export default Vue
