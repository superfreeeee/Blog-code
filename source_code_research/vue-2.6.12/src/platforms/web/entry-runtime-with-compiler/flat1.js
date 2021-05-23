/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

/* 根据 id 获取模版 */
const idToTemplate = /* ... */

const mount = Vue.prototype.$mount
/* 定义新的 $mount 函数(附加编译阶段) */
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {/* ... */}

/* 根据 el 元素获取模版 */
function getOuterHTML (el: Element): string {/* ... */}

Vue.compile = compileToFunctions

export default Vue
