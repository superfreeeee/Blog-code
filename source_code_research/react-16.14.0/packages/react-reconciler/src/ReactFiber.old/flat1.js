/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactElement} from 'shared/ReactElementType';
import type {
  ReactFragment,
  ReactPortal,
  ReactFundamentalComponent,
  ReactScope,
} from 'shared/ReactTypes';
import type {Fiber} from './ReactInternalTypes';
import type {RootTag} from './ReactRootTags';
import type {WorkTag} from './ReactWorkTags';
import type {TypeOfMode} from './ReactTypeOfMode';
import type {Lanes} from './ReactFiberLane';
import type {SuspenseInstance} from './ReactFiberHostConfig';
import type {OffscreenProps} from './ReactFiberOffscreenComponent';

import invariant from 'shared/invariant';
import {
  enableProfilerTimer,
  enableFundamentalAPI,
  enableScopeAPI,
  enableBlocksAPI,
} from 'shared/ReactFeatureFlags';
import {NoFlags, Placement} from './ReactFiberFlags';
import {ConcurrentRoot, BlockingRoot} from './ReactRootTags';
import {
  IndeterminateComponent,
  ClassComponent,
  HostRoot,
  HostComponent,
  HostText,
  HostPortal,
  ForwardRef,
  Fragment,
  Mode,
  ContextProvider,
  ContextConsumer,
  Profiler,
  SuspenseComponent,
  SuspenseListComponent,
  DehydratedFragment,
  FunctionComponent,
  MemoComponent,
  SimpleMemoComponent,
  LazyComponent,
  FundamentalComponent,
  ScopeComponent,
  Block,
  OffscreenComponent,
  LegacyHiddenComponent,
} from './ReactWorkTags';
import getComponentName from 'shared/getComponentName';

import {isDevToolsPresent} from './ReactFiberDevToolsHook.old';
import {
  resolveClassForHotReloading,
  resolveFunctionForHotReloading,
  resolveForwardRefForHotReloading,
} from './ReactFiberHotReloading.old';
import {NoLanes} from './ReactFiberLane';
import {
  NoMode,
  ConcurrentMode,
  DebugTracingMode,
  ProfileMode,
  StrictMode,
  BlockingMode,
} from './ReactTypeOfMode';
import {
  REACT_FORWARD_REF_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_DEBUG_TRACING_MODE_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_PROFILER_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
  REACT_FUNDAMENTAL_TYPE,
  REACT_SCOPE_TYPE,
  REACT_BLOCK_TYPE,
  REACT_OFFSCREEN_TYPE,
  REACT_LEGACY_HIDDEN_TYPE,
} from 'shared/ReactSymbols';

export type {Fiber};

let hasBadMapPolyfill;

if (__DEV__) {/* ... */}

let debugCounter = 1;

/* Fiber 节点原定义 */
function FiberNode(/* ... */) {/* ... */}

/* 创建 Fiber 节点(作为 FiberNode 的构造函数) */
const createFiber = function(/* ... */): Fiber {/* ... */};

function shouldConstruct(Component: Function) {/* ... */}

export function isSimpleFunctionComponent(type: any) {/* ... */}

export function resolveLazyComponentTag(Component: Function): WorkTag {/* ... */}

// This is used to create an alternate fiber to do work on.
export function createWorkInProgress(current: Fiber, pendingProps: any): Fiber {/* ... */}

// Used to reuse a Fiber for a second pass.
export function resetWorkInProgress(workInProgress: Fiber, renderLanes: Lanes) {/* ... */}

/* 创建宿主 Fiber 根节点 */
export function createHostRootFiber(tag: RootTag): Fiber {/* ... */}

export function createFiberFromTypeAndProps(/* ... */): Fiber {/* ... */}

export function createFiberFromElement(/* ... */): Fiber {/* ... */}

export function createFiberFromFragment(/* ... */): Fiber {/* ... */}

export function createFiberFromFundamental(/* ... */): Fiber {/* ... */}

function createFiberFromScope(/* ... */) {/* ... */}

function createFiberFromProfiler(/* ... */): Fiber {/* ... */}

export function createFiberFromSuspense(/* ... */) {/* ... */}

export function createFiberFromSuspenseList(/* ... */) {/* ... */}

export function createFiberFromOffscreen(/* ... */) {/* ... */}

export function createFiberFromLegacyHidden(/* ... */) {/* ... */}

export function createFiberFromText(/* ... */): Fiber {/* ... */}

export function createFiberFromHostInstanceForDeletion(): Fiber {/* ... */}

export function createFiberFromDehydratedFragment(/* ... */): Fiber {/* ... */}

export function createFiberFromPortal(/* ... */): Fiber {/* ... */}

// Used for stashing WIP properties to replay failed work in DEV.
export function assignFiberPropertiesInDEV(/* ... */): Fiber {/* ... */}
 