/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */

/* 检查是否为更新组件 */
function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  // 只要新旧有一个不存在
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  // 新旧都存在
  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  if (prevType === 'string' || prevType === 'number') {
    // 新/旧节点为文本 or 数字(primitive 类型)
    return nextType === 'string' || nextType === 'number';
  } else {
    // 新节点为对象 && 类型相同 && key 相同
    return nextType === 'object' &&
      prevElement.type === nextElement.type &&
      prevElement.key === nextElement.key;
  }
}

module.exports = shouldUpdateReactComponent;