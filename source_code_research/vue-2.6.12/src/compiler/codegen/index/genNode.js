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

/* 生成单独节点 */
function genNode (node: ASTNode, state: CodegenState): string {
  if (node.type === 1) {
    // 元素节点
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    // 注释节点
    return genComment(node)
  } else {
    // 文本节点
    return genText(node)
  }
}

// ...
