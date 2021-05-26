/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getComponentName from 'shared/getComponentName';
import invariant from 'shared/invariant';
import {REACT_ELEMENT_TYPE} from 'shared/ReactSymbols';

import ReactCurrentOwner from './ReactCurrentOwner';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

let specialPropKeyWarningShown,
  specialPropRefWarningShown,
  didWarnAboutStringRefs;

if (__DEV__) {
  didWarnAboutStringRefs = {};
}


/* 检查是否存在 ref 属性 */
function hasValidRef(config) {/* ... */}

/* 检查是否存在 key 属性 */
function hasValidKey(config) {/* ... */}

/* 测试用：添加 key 属性警告 */
function defineKeyPropWarningGetter(props, displayName) {/* ... */}

/* 测试用：添加 ref 属性警告 */
function defineRefPropWarningGetter(props, displayName) {/* ... */}

/* 测试用：对字符串的 ref 发出警告 */
function warnIfStringRefCannotBeAutoConverted(config) {/* ... */}

/* React 元素构造函数 */
const ReactElement = function(type, key, ref, self, source, owner, props) {/* ... */}

export function jsx(type, config, maybeKey) {/* ... */}

export function jsxDEV(type, config, maybeKey, source, self) {/* ... */}

/* React.createElement 创建 React 元素 */
export function createElement(type, config, children) {/* ... */}

export function createFactory(type) {/* ... */}

export function cloneAndReplaceKey(oldElement, newKey) {/* ... */}

export function cloneElement(element, config, children) {/* ... */}

export function isValidElement(object) {/* ... */}

