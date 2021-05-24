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

/* 生成 v-once 节点 */
function genOnce (el: ASTElement, state: CodegenState): string {
  el.onceProcessed = true

  if (el.if && !el.ifProcessed) {
    // 生成 v-if 节点
    return genIf(el, state)
  } else if (el.staticInFor) {
    // 生成 staticInFor 节点
    let key = ''
    let parent = el.parent
    while (parent) {
      if (parent.for) {
        key = parent.key
        break
      }
      parent = parent.parent
    }
    if (!key) {
      // v-once not in keyed v-for warning ...
      return genElement(el, state)
    }
    // 生成代码：_o(element, onceId, key)
    return `_o(${genElement(el, state)},${state.onceId++},${key})`
  } else {
    // 生成一般静态节点
    return genStatic(el, state)
  }
}

// ...
