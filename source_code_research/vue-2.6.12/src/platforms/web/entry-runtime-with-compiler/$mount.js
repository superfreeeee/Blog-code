import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

/* 定义新的 $mount 函数(附加编译阶段) */
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  /* 根据 el 传入的选择器获取 DOM 元素 */
  el = el && query(el)

  if (el === document.body || el === document.documentElement) {
    // mount to <html>, <body> warning ...
    return this
  }

  const options = this.$options
  /* 根据 el / template 预先进行模版编译 */
  if (!options.render) {
    let template = options.template
    if (template) {
      /* 1. 使用 template 选项 */
      if (typeof template === 'string') {
        /* case 1: template = '#xxx'，传入 id 选择器 */
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          // template not found warning ...
        }
      } else if (template.nodeType) {
        /* case 2: template = Element，直接传入模版节点 */
        template = template.innerHTML
      } else {
        /* case 3: unknown template option */
        // unknown template option warning ...
        return this
      }
    } else if (el) {
      /* 2. 使用 el 选项(不使用模版) -> 解析 el 传入的选择器 */
      template = getOuterHTML(el)
    }
    // 如果使用模版，则进行模版编译
    if (template) {
      // mark compile ...

      // 生成 render 渲染函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      // mark compile end & measure ...
    }
  }
  // 直接根据 el 进行注水(渲染)
  return mount.call(this, el, hydrating)
}