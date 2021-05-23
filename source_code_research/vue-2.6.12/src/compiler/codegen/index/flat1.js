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

export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {/* ... */}

export function genElement (el: ASTElement, state: CodegenState): string {/* ... */}

function genStatic (el: ASTElement, state: CodegenState): string {/* ... */}

function genOnce (el: ASTElement, state: CodegenState): string {/* ... */}

export function genIf (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {/* ... */}

function genIfConditions (
  conditions: ASTIfConditions,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {/* ... */}

export function genFor (
  el: any,
  state: CodegenState,
  altGen?: Function,
  altHelper?: string
): string {/* ... */}

export function genData (el: ASTElement, state: CodegenState): string {/* ... */}

function genDirectives (el: ASTElement, state: CodegenState): string | void {/* ... */}

function genInlineTemplate (el: ASTElement, state: CodegenState): ?string {/* ... */}

function genScopedSlots (
  el: ASTElement,
  slots: { [key: string]: ASTElement },
  state: CodegenState
): string {/* ... */}

function hash(str) {/* ... */}

function containsSlotChild (el: ASTNode): boolean {/* ... */}

function genScopedSlot (
  el: ASTElement,
  state: CodegenState
): string {/* ... */}

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

function genNode (node: ASTNode, state: CodegenState): string {/* ... */}

export function genText (text: ASTText | ASTExpression): string {/* ... */}

export function genComment (comment: ASTText): string {/* ... */}

function genSlot (el: ASTElement, state: CodegenState): string {/* ... */}

function genComponent (
  componentName: string,
  el: ASTElement,
  state: CodegenState
): string {/* ... */}

function genProps (props: Array<ASTAttr>): string {/* ... */}

function generateValue (value) {/* ... */}

function transformSpecialNewlines (text: string): string {/* ... */}
