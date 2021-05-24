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

/* 生成 slot 插槽节点 */
function genSlot (el: ASTElement, state: CodegenState): string {
  const slotName = el.slotName || '"default"'
  const children = genChildren(el, state)
  const childrenStr = children ? `,${children}` : ''
  // 生成代码：_t(name, [ children ]
  let res = `_t(${slotName}${childrenStr}`

  // 生成属性列表：attrs = {} 或 _t({}, [])
  const attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      })))
    : null
  const bind = el.attrsMap['v-bind']  // 存在动态绑定属性
  if ((attrs || bind) && !children) {
    res += `,null`  // 没有属性、绑定属性、子节点时进行填充
  }
  if (attrs) {
    res += `,${attrs}`  // 存在属性列表时填充
  }
  if (bind) {  // 有绑定属性
    res += `${attrs ? '' : ',null'},${bind}`
  }

  // 生成代码：
  //   有子节点：_t(name, [ children ], attrs, bind)
  //   没有子节点：_t(name, null, attrs, bind)
  //   没有属性：_t(name, null, null, bind)
  return res + ')'
}

// ...
