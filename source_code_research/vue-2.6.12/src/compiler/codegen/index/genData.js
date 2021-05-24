/* @flow */

import { genHandlers } from './events'
import baseDirectives from '../directives/index'
import { camelize, no, extend } from 'shared/util'
import { baseWarn, pluckModuleFunction } from '../helpers'
import { emptySlotScopeToken } from '../parser/index'

type TransformFunction = (el: ASTElement, code: string) => string;
type DataGenFunction = (el: ASTElement) => string;
type DirectiveFunction = (el: ASTElement, dir: ASTDirective, warn: Function) => boolean;

export class CodegenState {/* ... */}

export type CodegenResult = {
  render: string,
  staticRenderFns: Array<string>
};

/* 生成 data 属性 */
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'

  // 1. directives 属性
  const dirs = genDirectives(el, state)
  if (dirs) data += dirs + ','
  
  // 2. key 属性
  if (el.key) {
    data += `key:${el.key},`
  }

  // 3. ref 属性
  if (el.ref) {
    data += `ref:${el.ref},`
  }

  // 4. refInFor 标志
  if (el.refInFor) {
    data += `refInFor:true,`
  }

  // 5. pre 标志
  if (el.pre) {
    data += `pre:true,`
  }

  // 6. tag 标签
  if (el.component) {
    data += `tag:"${el.tag}",`
  }

  // 7. data 数据模块生成
  for (let i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el)
  }

  // 8. props 属性
  if (el.attrs) {
    data += `attrs:${genProps(el.attrs)},`
  }

  // 9. DOM props 属性
  if (el.props) {
    data += `domProps:${genProps(el.props)},`
  }

  // 10. handlers 属性
  if (el.events) {
    // events
    data += `${genHandlers(el.events, false)},`
  }
  if (el.nativeEvents) {
    // nativeEvents
    data += `${genHandlers(el.nativeEvents, true)},`
  }

  // 11. non-scoped slot 插槽属性
  if (el.slotTarget && !el.slotScope) {
    data += `slot:${el.slotTarget},`
  }

  // 12. scoped slots
  if (el.scopedSlots) {
    data += `${genScopedSlots(el, el.scopedSlots, state)},`
  }

  // 13. v-model 属性
  if (el.model) {
    data += `model:{value:${
      el.model.value
    },callback:${
      el.model.callback
    },expression:${
      el.model.expression
    }},`
  }

  // 14. inline-template 属性
  if (el.inlineTemplate) {
    const inlineTemplate = genInlineTemplate(el, state)
    if (inlineTemplate) {
      data += `${inlineTemplate},`
    }
  }

  data = data.replace(/,$/, '') + '}'

  // 动态绑定包装函数：_b(data, "tag", props)
  if (el.dynamicAttrs) {
    data = `_b(${data},"${el.tag}",${genProps(el.dynamicAttrs)})`
  }
  // 动态绑定属性
  if (el.wrapData) {
    data = el.wrapData(data)
  }
  // 动态绑定事件处理函数
  if (el.wrapListeners) {
    data = el.wrapListeners(data)
  }

  // 生成代码：
  /*
  data = {
    dirs,
    key: val,
    ref: val,
    refInFor: true,
    pre: true,
    tag: "tagName",
    dataGenFns[n](el),
    props,
    domProps,
    handlers,
    slot: slotTarget,
    scopedSlots,
    value: val,
    callback: val,
    expression: val,
  }
  */
  return data
}

// ...
