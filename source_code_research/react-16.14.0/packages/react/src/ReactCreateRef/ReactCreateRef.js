/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import type {RefObject} from 'shared/ReactTypes';

// an immutable object with a single mutable value
/* 创建引用：React.createRef 方法 */
export function createRef(): RefObject {
  // 使用引用对象：ref.current
  const refObject = {
    current: null,
  };
  // 测试用：调用 Object.seal
  if (__DEV__) {
    Object.seal(refObject);
  }
  // 返回该引用
  return refObject;
}
 