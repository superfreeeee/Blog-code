import { emptyObject } from 'shared/util'
import { parseFilters } from './parser/filter-parser'

type Range = { start?: number, end?: number };

export function baseWarn (msg: string, range?: Range) {/* ... */}

export function pluckModuleFunction<F: Function> (/* ... */}

/* 添加自定义属性(props) */
export function addProp (el: ASTElement, name: string, value: string, range?: Range, dynamic?: boolean) {/* ... */}

/* 添加元素属性 */
export function addAttr (el: ASTElement, name: string, value: any, range?: Range, dynamic?: boolean) {/* ... */}

export function addRawAttr (el: ASTElement, name: string, value: any, range?: Range) {/* ... */}

export function addDirective (/* ... */) {/* ... */}

function prependModifierMarker (symbol: string, name: string, dynamic?: boolean): string {/* ... */}

export function addHandler (/* ... */) {/* ... */}

/* 简单获取绑定属性值 */
export function getRawBindingAttr (/* ... */) {/* ... */}

/* 抽取绑定属性 */
export function getBindingAttr (/* ... */) {/* ... */}

/* 获取目标属性并从原字符串中移除 */
export function getAndRemoveAttr (/* ... */) {/* ... */}

/* 获取目标属性并从原字符串中移除(使用正则表达式查找属性) */
export function getAndRemoveAttrByRegex (/* ... */) {/* ... */}

/* 设置 range(start & end) */
function rangeSetItem (/* ... */) {/* ... */}
