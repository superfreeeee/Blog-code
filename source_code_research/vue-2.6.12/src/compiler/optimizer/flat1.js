/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

// 缓存静态属性名生成器
const genStaticKeysCached = cached(genStaticKeys)

/* 编译优化 */
export function optimize (root: ?ASTElement, options: CompilerOptions) {/* ... */}

/* 创建静态属性名 */
function genStaticKeys (keys: string): Function {/* ... */}

/* 标记静态节点 */
function markStatic (node: ASTNode) {/* ... */}

/* 标记静态根节点 */
function markStaticRoots (node: ASTNode, isInFor: boolean) {/* ... */}

/* 检查是否为静态节点 */
function isStatic (node: ASTNode): boolean {/* ... */}

/* 检查是否是 template / v-for 的 子节点 */
function isDirectChildOfTemplateFor (node: ASTElement): boolean {/* ... */}
