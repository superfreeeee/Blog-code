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

/* 解析模版 */
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

  /* 元素闭合 */
  function closeElement (element) {
    // 1. 移除尾部空白并处理节点
    trimEndingWhitespace(element)
    if (!inVPre && !element.processed) {
      element = processElement(element, options)
    }

    // 2. 节点树管理
    if (!stack.length && element !== root) {
      if (root.if && (element.elseif || element.else)) {
        // 允许在根组件使用 v-if、v-else-if、v-else
        if (process.env.NODE_ENV !== 'production') {
          checkRootConstraints(element)
        }
        // 添加到条件编译区块
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        })
      } else if (process.env.NODE_ENV !== 'production') {
        // multiple root element warning ...
      }
    }

    // 3. 将当前节点加入插入父节点
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        // 前驱 v-if 则加入 ifConditions
        processIfConditions(element, currentParent)
      } else {
        if (element.slotScope) {
          // 处理 slot 节点子元素
          const name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
        }
        currentParent.children.push(element)
        element.parent = currentParent
      }
    }

    // 过滤 scoped 插槽
    element.children = element.children.filter(c => !(c: any).slotScope)
    // 再移除尾部空白
    trimEndingWhitespace(element)

    // 4. 检查 pre 标志(v-pre 属性)
    if (element.pre) {
      inVPre = false
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false
    }

    // 调用 postTransforms 后处理
    for (let i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options)
    }
  }
  
  return root
}
