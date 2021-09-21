/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

 import type {LazyComponent} from 'react/src/ReactLazy';

 import {
   REACT_CONTEXT_TYPE,
   REACT_FORWARD_REF_TYPE,
   REACT_FRAGMENT_TYPE,
   REACT_PORTAL_TYPE,
   REACT_MEMO_TYPE,
   REACT_PROFILER_TYPE,
   REACT_PROVIDER_TYPE,
   REACT_STRICT_MODE_TYPE,
   REACT_SUSPENSE_TYPE,
   REACT_SUSPENSE_LIST_TYPE,
   REACT_LAZY_TYPE,
   REACT_BLOCK_TYPE,
 } from 'shared/ReactSymbols';
 import type {ReactContext, ReactProviderType} from 'shared/ReactTypes';
 
function getWrappedName(/* ... */) {/* ... */}

function getContextName(type: ReactContext<any>) {/* ... */}

/* 获取元素名称 */
function getComponentName(type: mixed): string | null {/* ... */}

export default getComponentName;
