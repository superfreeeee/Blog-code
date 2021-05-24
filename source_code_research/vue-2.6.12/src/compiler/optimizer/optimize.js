/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)

/* 编译优化 */
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return

  // 创建静态属性名、平台保留标签名
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no

  // 标记静态节点：node.static
  markStatic(root)
  // 标记静态根节点：node.staticRoot
  markStaticRoots(root, false)
}