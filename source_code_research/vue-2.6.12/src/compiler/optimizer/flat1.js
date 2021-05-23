/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)

export function optimize (root: ?ASTElement, options: CompilerOptions) {/* ... */}

function genStaticKeys (keys: string): Function {/* ... */}

function markStatic (node: ASTNode) {/* ... */}

function markStaticRoots (node: ASTNode, isInFor: boolean) {/* ... */}

function isStatic (node: ASTNode): boolean {/* ... */}

function isDirectChildOfTemplateFor (node: ASTElement): boolean {/* ... */}
