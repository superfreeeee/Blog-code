/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Container} from './ReactDOMHostConfig';
import type {RootTag} from 'react-reconciler/src/ReactRootTags';
import type {MutableSource, ReactNodeList} from 'shared/ReactTypes';
import type {FiberRoot} from 'react-reconciler/src/ReactInternalTypes';

export type RootType = {
  render(children: ReactNodeList): void,
  unmount(): void,
  _internalRoot: FiberRoot,
  ...
};

export type RootOptions = {
  hydrate?: boolean,
  hydrationOptions?: {
    onHydrated?: (suspenseNode: Comment) => void,
    onDeleted?: (suspenseNode: Comment) => void,
    mutableSources?: Array<MutableSource<any>>,
    ...
  },
  ...
};

import {
  isContainerMarkedAsRoot,
  markContainerAsRoot,
  unmarkContainerAsRoot,
} from './ReactDOMComponentTree';
import {listenToAllSupportedEvents} from '../events/DOMPluginEventSystem';
import {
  ELEMENT_NODE,
  COMMENT_NODE,
  DOCUMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
} from '../shared/HTMLNodeType';

import {
  createContainer,
  updateContainer,
  findHostInstanceWithNoPortals,
  registerMutableSourceForHydration,
} from 'react-reconciler/src/ReactFiberReconciler';
import invariant from 'shared/invariant';
import {
  BlockingRoot,
  ConcurrentRoot,
  LegacyRoot,
} from 'react-reconciler/src/ReactRootTags';

/* 容器用根节点 */
function ReactDOMRoot(container: Container, options: void | RootOptions) {/* ... */}

function ReactDOMBlockingRoot(/* ... */) {/* ... */}

ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function(/* ... */): void {/* ... */};

ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function(): void {/* ... */};

/* 容器用根节点原始方法 */
function createRootImpl(/* ... */) {/* ... */}

export function createRoot(/* ... */): RootType {/* ... */}

export function createBlockingRoot(/* ... */): RootType {/* ... */}

export function createLegacyRoot(/* ... */): RootType {/* ... */}

/* 检查是否为有效容器元素 */
export function isValidContainer(node: mixed): boolean {/* ... */}

function warnIfReactDOMContainerInDEV(container) {/* ... */}
