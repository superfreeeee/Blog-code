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

/* 生成 inline-template 属性 */
function genInlineTemplate (el: ASTElement, state: CodegenState): ?string {
  const ast = el.children[0]
  // inline-template multiple children warning ...

  // 嵌套渲染模版
  if (ast && ast.type === 1) {
    const inlineRenderFns = generate(ast, state.options)
    const render = `render:function(){${inlineRenderFns.render}}`
    const staticRenderFnsCodes = inlineRenderFns.staticRenderFns.map(code => `function(){${code}}`).join(',')
    const staticRenderFns = `staticRenderFns:[${staticRenderFnsCodes}]`
    
    // 生成代码：inlineTemplate: {
    //   render: function() { inlineRenderFns.render },
    //   staticRenderFns: [ function() { code }, ... ] }
    return `inlineTemplate:{${render},${staticRenderFns}}`
  }
}

// ...
