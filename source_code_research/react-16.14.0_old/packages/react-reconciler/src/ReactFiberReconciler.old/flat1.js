/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber, SuspenseHydrationCallbacks} from './ReactInternalTypes';
import type {FiberRoot} from './ReactInternalTypes';
import type {RootTag} from './ReactRootTags';
import type {
  Instance,
  TextInstance,
  Container,
  PublicInstance,
} from './ReactFiberHostConfig';
import type {RendererInspectionConfig} from './ReactFiberHostConfig';
import {FundamentalComponent} from './ReactWorkTags';
import type {ReactNodeList} from 'shared/ReactTypes';
import type {Lane, LanePriority} from './ReactFiberLane';
import type {SuspenseState} from './ReactFiberSuspenseComponent.old';

import {
  findCurrentHostFiber,
  findCurrentHostFiberWithNoPortals,
} from './ReactFiberTreeReflection';
import {get as getInstance} from 'shared/ReactInstanceMap';
import {
  HostComponent,
  ClassComponent,
  HostRoot,
  SuspenseComponent,
} from './ReactWorkTags';
import getComponentName from 'shared/getComponentName';
import invariant from 'shared/invariant';
import {enableSchedulingProfiler} from 'shared/ReactFeatureFlags';
import ReactSharedInternals from 'shared/ReactSharedInternals';
import {getPublicInstance} from './ReactFiberHostConfig';
import {
  findCurrentUnmaskedContext,
  processChildContext,
  emptyContextObject,
  isContextProvider as isLegacyContextProvider,
} from './ReactFiberContext.old';
import {createFiberRoot} from './ReactFiberRoot.old';
import {injectInternals, onScheduleRoot} from './ReactFiberDevToolsHook.old';
import {
  requestEventTime,
  requestUpdateLane,
  scheduleUpdateOnFiber,
  flushRoot,
  batchedEventUpdates,
  batchedUpdates,
  unbatchedUpdates,
  flushSync,
  flushControlled,
  deferredUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  flushPassiveEffects,
  warnIfNotScopedWithMatchingAct,
  warnIfUnmockedScheduler,
  IsThisRendererActing,
  act,
} from './ReactFiberWorkLoop.old';
import {createUpdate, enqueueUpdate} from './ReactUpdateQueue.old';
import {
  isRendering as ReactCurrentFiberIsRendering,
  current as ReactCurrentFiberCurrent,
  resetCurrentFiber as resetCurrentDebugFiberInDEV,
  setCurrentFiber as setCurrentDebugFiberInDEV,
} from './ReactCurrentFiber';
import {StrictMode} from './ReactTypeOfMode';
import {
  SyncLane,
  InputDiscreteHydrationLane,
  SelectiveHydrationLane,
  NoTimestamp,
  getHighestPriorityPendingLanes,
  higherPriorityLane,
  getCurrentUpdateLanePriority,
  setCurrentUpdateLanePriority,
} from './ReactFiberLane';
import {
  scheduleRefresh,
  scheduleRoot,
  setRefreshHandler,
  findHostInstancesForRefresh,
} from './ReactFiberHotReloading.old';
import {markRenderScheduled} from './SchedulingProfiler';

export {registerMutableSourceForHydration} from './ReactMutableSource.new';
export {createPortal} from './ReactPortal';
export {
  createComponentSelector,
  createHasPsuedoClassSelector,
  createRoleSelector,
  createTestNameSelector,
  createTextSelector,
  getFindAllNodesFailureDescription,
  findAllNodes,
  findBoundingRects,
  focusWithin,
  observeVisibleRects,
} from './ReactTestSelectors';

type OpaqueRoot = FiberRoot;

// 0 is PROD, 1 is DEV.
// Might add PROFILE later.
type BundleType = 0 | 1;

type DevToolsConfig = {|
  bundleType: BundleType,
  version: string,
  rendererPackageName: string,
  // Note: this actually *does* depend on Fiber internal fields.
  // Used by "inspect clicked DOM element" in React DevTools.
  findFiberByHostInstance?: (instance: Instance | TextInstance) => Fiber | null,
  rendererConfig?: RendererInspectionConfig,
|};

let didWarnAboutNestedUpdates;
let didWarnAboutFindNodeInStrictMode;

if (__DEV__) {
  didWarnAboutNestedUpdates = false;
  didWarnAboutFindNodeInStrictMode = {};
}

function getContextForSubtree(/* ... */): Object {/* ... */}

function findHostInstance(component: Object): PublicInstance | null {/* ... */}

function findHostInstanceWithWarning(/* ... */): PublicInstance | null {/* ... */}

/* 创建容器根节点 */
export function createContainer(/* ... */): OpaqueRoot {/* ... */}

export function updateContainer(/* ... */): Lane {/* ... */}

export {
  batchedEventUpdates,
  batchedUpdates,
  unbatchedUpdates,
  deferredUpdates,
  discreteUpdates,
  flushDiscreteUpdates,
  flushControlled,
  flushSync,
  flushPassiveEffects,
  IsThisRendererActing,
  act,
};

export function getPublicRootInstance(/* ... */): React$Component<any, any> | PublicInstance | null {/* ... */}

export function attemptSynchronousHydration(fiber: Fiber): void {/* ... */}

function markRetryLaneImpl(fiber: Fiber, retryLane: Lane) {/* ... */}

// Increases the priority of thennables when they resolve within this boundary.
function markRetryLaneIfNotHydrated(fiber: Fiber, retryLane: Lane) {/* ... */}

export function attemptUserBlockingHydration(fiber: Fiber): void {/* ... */}

export function attemptContinuousHydration(fiber: Fiber): void {/* ... */}

export function attemptHydrationAtCurrentPriority(fiber: Fiber): void {/* ... */}

export function runWithPriority<T>(priority: LanePriority, fn: () => T) {/* ... */}

export {getCurrentUpdateLanePriority};

export {findHostInstance};

export {findHostInstanceWithWarning};

export function findHostInstanceWithNoPortals(/* ... */): PublicInstance | null {/* ... */}

let shouldSuspendImpl = fiber => false;

export function shouldSuspend(fiber: Fiber): boolean {/* ... */}

let overrideHookState = null;
let overrideHookStateDeletePath = null;
let overrideHookStateRenamePath = null;
let overrideProps = null;
let overridePropsDeletePath = null;
let overridePropsRenamePath = null;
let scheduleUpdate = null;
let setSuspenseHandler = null;

if (__DEV__) {/* ... */}

function findHostInstanceByFiber(fiber: Fiber): Instance | TextInstance | null {/* ... */}

function emptyFindFiberByHostInstance(/* ... */): Fiber | null {/* ... */}

function getCurrentFiberForDevTools() {/* ... */}

export function injectIntoDevTools(devToolsConfig: DevToolsConfig): boolean {/* ... */}
 