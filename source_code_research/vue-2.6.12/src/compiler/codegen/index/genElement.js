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

/* 生成元素节点 */
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    /* 生成静态节点 */
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    /* 生成 v-once 节点 */
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    /* 生成 v-for 节点 */
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    /* 生成 v-if 节点 */
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    /* 生成 template 子节点 */
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    /* 生成 slot 插槽节点 */
    return genSlot(el, state)
  } else {
    /* 生成组件节点 or 一般元素节点 */
    let code
    if (el.component) {
      // 组件节点
      code = genComponent(el.component, el, state)
    } else {
      // 一般元素节点
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        // 生成数据：data = { ... }
        data = genData(el, state)
      }

      // 生成子节点列表：[ children ]
      const children = el.inlineTemplate ? null : genChildren(el, state, true)

      const tagStr = `${el.tag}`
      const dataStr = data ? `,${data}` : ''
      const childrenStr = children ? `,${children}` : ''

      // 生成代码：_c(tag, data, [ children ])
      code = `_c(${tagStr}${dataStr}${childrenStr})`
    }
    // 选项 transforms 后处理模块
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}

// ...
