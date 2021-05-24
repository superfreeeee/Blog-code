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

/* 生成节点属性 */
function genProps (props: Array<ASTAttr>): string {
  let staticProps = ``
  let dynamicProps = ``
  // 生成属性列表
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const value = __WEEX__
      ? generateValue(prop.value)
      : transformSpecialNewlines(prop.value)
    // 生成代码：
    //   动态：prop,value,
    //   静态："prop":value,
    if (prop.dynamic) {
      dynamicProps += `${prop.name},${value},`
    } else {
      staticProps += `"${prop.name}":${value},`
    }
  }
  // 合并静态属性：{prop:value, ...}
  staticProps = `{${staticProps.slice(0, -1)}}`

  if (dynamicProps) {
    // 生成代码(动态属性)：_d({ staticProps }, [ prop1, value1, ... ])
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`
  } else {
    // 生成代码(静态属性)：{ staticProps }
    return staticProps
  }
}

// ...
