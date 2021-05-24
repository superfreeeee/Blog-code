/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

/* 创建模版编译函数 */
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 解析 html 文本
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化 AST 节点树(标记静态节点)
    optimize(ast, options)
  }
  // 生成渲染代码
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
