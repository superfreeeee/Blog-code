/* @flow */

import he from 'he'
import { parseHTML } from './html-parser'
import { parseText } from './text-parser'
import { parseFilters } from './filter-parser'
import { genAssignmentCode } from '../directives/model'
import { extend, cached, no, camelize, hyphenate } from 'shared/util'
import { isIE, isEdge, isServerRendering } from 'core/util/env'

import {
  addProp,
  addAttr,
  baseWarn,
  addHandler,
  addDirective,
  getBindingAttr,
  getAndRemoveAttr,
  getRawBindingAttr,
  pluckModuleFunction,
  getAndRemoveAttrByRegex
} from '../helpers'

export const onRE = /^@|^v-on:/
export const dirRE = process.env.VBIND_PROP_SHORTHAND
  ? /^v-|^@|^:|^\.|^#/
  : /^v-|^@|^:|^#/
export const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
export const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g
const dynamicArgRE = /^\[.*\]$/

const argRE = /:(.*)$/
export const bindRE = /^:|^\.|^v-bind:/
const propBindRE = /^\./
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g

const slotRE = /^v-slot(:|$)|^#/

const lineBreakRE = /[\r\n]/
const whitespaceRE = /\s+/g

const invalidAttributeRE = /[\s"'<>\/=]/

const decodeHTMLCached = cached(he.decode)

export const emptySlotScopeToken = `_empty_`

// configurable state
export let warn: any
let delimiters
let transforms
let preTransforms
let postTransforms
let platformIsPreTag
let platformMustUseProp
let platformGetTagNamespace
let maybeComponent

export function parse (
  template: string,
  options: CompilerOptions
): ASTElement | void {
  
  // configure init ...

  const stack = []
  const preserveWhitespace = options.preserveWhitespace !== false
  const whitespaceOption = options.whitespace
  let root
  let currentParent
  let inVPre = false
  let inPre = false
  let warned = false

  // ... 

  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,

    /* 解析开始标签 */
    start (tag, attrs, unary, start, end) {
      // 1. 检查命名空间并继承
      const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

      // 2. 检查是否为 svg
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs)
      }

      // 3. 创建 AST 节点 & 命名空间 ns
      let element: ASTElement = createASTElement(tag, attrs, currentParent)
      if (ns) {
        element.ns = ns
      }

      if (process.env.NODE_ENV !== 'production') {
        if (options.outputSourceRange) {
          // 3.x 记录元素原始信息：start, end, rawAttrsMap
          element.start = start
          element.end = end
          element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
            cumulated[attr.name] = attr
            return cumulated
          }, {})
        }
        // attrs contain special chars warning ...
      }

      // 4. 检查是否为特殊节点标签(style, script)
      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true
        // side-effects tag name warning ...
      }

      // 5. 加载预处理方法
      for (let i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element
      }

      // 6.1 检查 v-pre 标志
      if (!inVPre) {
        processPre(element)
        if (element.pre) {
          inVPre = true
        }
      }
      // 6.2平台相关检查 v-pre 标志
      if (platformIsPreTag(element.tag)) {
        inPre = true
      }
      if (inVPre) {
        // 7.1 处理简单属性列表
        processRawAttrs(element)
      } else if (!element.processed) {
        // 7.2 处理 vue 特别属性
        processFor(element)  // v-for
        processIf(element)   // v-if
        processOnce(element) // v-once
      }

      // 8. 检查根节点标签 & 属性
      if (!root) {
        root = element
        if (process.env.NODE_ENV !== 'production') {
          checkRootConstraints(root)
        }
      }

      // 9. 自闭合组件处理
      if (!unary) {
        currentParent = element
        stack.push(element)
      } else {
        closeElement(element)
      }
    },

    end (tag, start, end) {/* ... */},

    chars (text: string, start: number, end: number) {/* ... */},

    comment (text: string, start, end) {/* ... */}
  })
  return root
}
