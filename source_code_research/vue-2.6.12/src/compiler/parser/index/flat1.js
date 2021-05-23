/* @flow */

import he from 'he'
import { parseHTML } from './html-parser'
import { parseText } from './text-parser'
import { parseFilters } from './filter-parser'
import { genAssignmentCode } from '../directives/model'
import { extend, cached, no, camelize, hyphenate } from 'shared/util'
import { isIE, isEdge, isServerRendering } from 'core/util/env'

import {
  addProp,
  addAttr,
  baseWarn,
  addHandler,
  addDirective,
  getBindingAttr,
  getAndRemoveAttr,
  getRawBindingAttr,
  pluckModuleFunction,
  getAndRemoveAttrByRegex
} from '../helpers'

export const onRE = /^@|^v-on:/
export const dirRE = process.env.VBIND_PROP_SHORTHAND
  ? /^v-|^@|^:|^\.|^#/
  : /^v-|^@|^:|^#/
export const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
export const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g
const dynamicArgRE = /^\[.*\]$/

const argRE = /:(.*)$/
export const bindRE = /^:|^\.|^v-bind:/
const propBindRE = /^\./
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g

const slotRE = /^v-slot(:|$)|^#/

const lineBreakRE = /[\r\n]/
const whitespaceRE = /\s+/g

const invalidAttributeRE = /[\s"'<>\/=]/

const decodeHTMLCached = cached(he.decode)

export const emptySlotScopeToken = `_empty_`

// configurable state
export let warn: any
let delimiters
let transforms
let preTransforms
let postTransforms
let platformIsPreTag
let platformMustUseProp
let platformGetTagNamespace
let maybeComponent


/* 创建 AST 元素节点 */
export function createASTElement (/* ... */) {/* ... */}

/* 解析模版 */
export function parse (/* ... */) {/* ... */}

/* 检查 v-pre 属性 & 添加标记 */
function processPre (el) {/* ... */}

/* 处理简单属性列表 */
function processRawAttrs (el) {/* ... */}

/* 处理元素节点 */
export function processElement (/* ... */) {/* ... */}

/* 处理 key 属性 */
function processKey (el) {/* ... */}

/* 处理 ref 属性 */
function processRef (el) {/* ... */}

/* 处理 v-for 属性 */
export function processFor (el: ASTElement) {/* ... */}

/* v-for 属性表达式解析结果 */
type ForParseResult = {
  // (item, index, arr) in target
  for: string;  // 循环目标(target)
  alias: string;  // 循环对象(item)
  iterator1?: string;  // index
  iterator2?: string;  // arr
};

/* 解析 v-for 属性表达式 */
export function parseFor (exp: string): ?ForParseResult {/* ... */}

/* 处理 v-if、v-else-if、v-else 属性 */
function processIf (el) {/* ... */}

/* 处理条件编译(ifConditions 列表) */
function processIfConditions (el, parent) {/* ... */}

/* 获取前驱元素节点 */
function findPrevElement (children: Array<any>): ASTElement | void {/* ... */}

/* 向目标节点添加条件编译(ifConditions) */
export function addIfCondition (el: ASTElement, condition: ASTIfCondition) {/* ... */}

/* 处理 v-once 属性 */
function processOnce (el) {/* ... */}

/* 处理带 v-slot 属性标签 */
function processSlotContent (el) {/* ... */}

/* 获取插槽名称 */
function getSlotName (binding) {/* ... */}

/* 处理 <slot> 标签 */
function processSlotOutlet (el) {/* ... */}

/* 处理组件类型属性 */
function processComponent (el) {/* ... */}

/* 处理节点属性 */
function processAttrs (el) {/* ... */}

/* 检查是否处于 v-for 列表渲染中 */
function checkInFor (el: ASTElement): boolean {/* ... */}

function parseModifiers (name: string): Object | void {/* ... */}

function makeAttrsMap (attrs: Array<Object>): Object {/* ... */}

/* 检查是否为纯文本节点 */
function isTextTag (el): boolean {/* ... */}

/* 检查是否为特殊元素标签 */
function isForbiddenTag (el): boolean {/* ... */}

function guardIESVGBug (attrs) {/* ... */}

function checkForAliasModel (el, value) {/* ... */}
