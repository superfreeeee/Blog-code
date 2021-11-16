/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Fiber 类型
import type {Fiber} from 'react-reconciler/src/ReactInternalTypes';

/**
* Keeps track of the current owner.
*
* The current owner is the component who should own any components that are
* currently being constructed.
*/
/* 全局节点：当前元素的父节点 */
// 使用 { current } 来避免 CommonJS 的导入模式影响
const ReactCurrentOwner = {
  /**
  * @internal
  * @type {ReactComponent}
  */
  current: (null: null | Fiber),
};

export default ReactCurrentOwner;
