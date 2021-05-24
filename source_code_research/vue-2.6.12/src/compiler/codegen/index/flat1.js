/* @flow */

import { genHandlers } from './events'
import baseDirectives from '../directives/index'
import { camelize, no, extend } from 'shared/util'
import { baseWarn, pluckModuleFunction } from '../helpers'
import { emptySlotScopeToken } from '../parser/index'

type TransformFunction = (el: ASTElement, code: string) => string;
type DataGenFunction = (el: ASTElement) => string;
type DirectiveFunction = (el: ASTElement, dir: ASTDirective, warn: Function) => boolean;

/* 代码生成状态 */
export class CodegenState {/* ... */}

/* generate 返回类型 */
export type CodegenResult = {
  render: string,
  staticRenderFns: Array<string>
};

/* 生成渲染代码 */
export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {/* ... */}

/* 生成元素节点 */
export function genElement (el: ASTElement, state: CodegenState): string {/* ... */}

/* 生成静态节点 */
function genStatic (el: ASTElement, state: CodegenState): string {/* ... */}

/* 生成 v-once 节点 */
function genOnce (el: ASTElement, state: CodegenState): string {/* ... */}

/* 生成 v-if 节点 */
export function genIf (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {/* ... */}

/* 生成 v-if、v-else-if、v-else 条件编译 */
function genIfConditions (
  conditions: ASTIfConditions,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {/* ... */}

/* 生成 v-for 节点 */
export function genFor (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altHelper?: string
): string {/* ... */}

/* 生成 data 属性 */
export function genData (el: ASTElement, state: CodegenState): string {/* ... */}

/* 生成 directives 属性 */
function genDirectives (el: ASTElement, state: CodegenState): string | void {/* ... */}

/* 生成 inline-template 属性 */
function genInlineTemplate (el: ASTElement, state: CodegenState): ?string {/* ... */}

/* 生成 scoped slots 属性 */
function genScopedSlots (
  el: ASTElement,
  slots: { [key: string]: ASTElement },
  state: CodegenState
): string {/* ... */}

/* 生成哈希值 */
function hash(str) {/* ... */}

function containsSlotChild (el: ASTNode): boolean {/* ... */}

function genScopedSlot (
  el: ASTElement,
  state: CodegenState
): string {/* ... */}

/* 生成子节点 */
export function genChildren (
  el: ASTElement,
  state: CodegenState,
  checkSkip?: boolean,
  altGenElement?: Function,
  altGenNode?: Function
): string | void {/* ... */}

function getNormalizationType (
  children: Array<ASTNode>,
  maybeComponent: (el: ASTElement) => boolean
): number {/* ... */}

function needsNormalization (el: ASTElement): boolean {/* ... */}

/* 生成单独节点 */
function genNode (node: ASTNode, state: CodegenState): string {/* ... */}

/* 生成文本节点 */
export function genText (text: ASTText | ASTExpression): string {/* ... */}

/* 生成注释节点 */
export function genComment (comment: ASTText): string {/* ... */}

/* 生成 slot 插槽节点 */
function genSlot (el: ASTElement, state: CodegenState): string {/* ... */}

/* 生成组件节点 */
function genComponent (
  componentName: string,
  el: ASTElement,
  state: CodegenState
): string {/* ... */}

/* 生成节点属性 */
function genProps (props: Array<ASTAttr>): string {/* ... */}

/* 生成节点属性值 */
function generateValue (value) {/* ... */}

/* 换行符转义 */
function transformSpecialNewlines (text: string): string {/* ... */}
