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

/* 生成 directives 属性 */
function genDirectives (el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
  if (!dirs) return

  // 生成指令：directives: []
  let res = 'directives:['
  let hasRuntime = false
  let i, l, dir, needRuntime
  // 遍历所有指令
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // 需要 runtime 动态绑定
      needRuntime = !!gen(el, dir, state.warn)
    }
    if (needRuntime) {
      hasRuntime = true
      const value = dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
      const arg = dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''
      const modidires = dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${value}${arg}${modidires}},`
    }
  }
  if (hasRuntime) {
    // 生成代码：directives: [{name: "", rawName: "", value, expression, arg, modifiers}, ...]
    return res.slice(0, -1) + ']'
  }
}

// ...
