/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// 收集所有依赖模块
const modules = platformModules.concat(baseModules)

// 创建 web 版本的运行时 patch
export const patch: Function = createPatchFunction({ nodeOps, modules })
