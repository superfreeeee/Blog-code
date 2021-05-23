/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

/* 根据 baseOptions 选，项使用 createCompiler 创建模版编译函数 */
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
