/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE} from 'shared/ReactSymbols';

import type {ReactContext} from 'shared/ReactTypes';

/* 创建上下文组件：React.createContext */
export function createContext<T>(
  defaultValue: T,
  calculateChangedBits: ?(a: T, b: T) => number,
): ReactContext<T> {
  // 1. 基本变量初始化
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    if (__DEV__) {/* 测试用 */}
  }

  // 2. context 对象本体
  const context: ReactContext<T> = {/* ... */};

  // 3. 初始化 Provider
  context.Provider = {/* ... */};

  let hasWarnedAboutUsingNestedContextConsumers = false;
  let hasWarnedAboutUsingConsumerProvider = false;
  let hasWarnedAboutDisplayNameOnConsumer = false;

  if (__DEV__) {
    /* 测试用 */
  } else {
    context.Consumer = context;
  }

  if (__DEV__) {/* 测试用 */}

  return context;
}
