/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Container} from './ReactDOMHostConfig';
import type {RootType} from './ReactDOMRoot';
import type {ReactNodeList} from 'shared/ReactTypes';

import {
  getInstanceFromNode,
  isContainerMarkedAsRoot,
  unmarkContainerAsRoot,
} from './ReactDOMComponentTree';
import {createLegacyRoot, isValidContainer} from './ReactDOMRoot';
import {ROOT_ATTRIBUTE_NAME} from '../shared/DOMProperty';
import {
  DOCUMENT_NODE,
  ELEMENT_NODE,
  COMMENT_NODE,
} from '../shared/HTMLNodeType';

import {
  findHostInstanceWithNoPortals,
  updateContainer,
  unbatchedUpdates,
  getPublicRootInstance,
  findHostInstance,
  findHostInstanceWithWarning,
} from 'react-reconciler/src/ReactFiberReconciler';
import getComponentName from 'shared/getComponentName';
import invariant from 'shared/invariant';
import ReactSharedInternals from 'shared/ReactSharedInternals';
import {has as hasInstance} from 'shared/ReactInstanceMap';

const ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;

/* 顶层组件更新警告 */
let topLevelUpdateWarnings;
let warnedAboutHydrateAPI = false;

// 测试用
if (__DEV__) {
  topLevelUpdateWarnings = (container: Container) => {/* ... */};
}

/* 从容器获取根节点(container.firstChild) */
function getReactRootElementInContainer(container: any) {/* ... */}

/* 检查是否需要直接注水 */
function shouldHydrateDueToLegacyHeuristic(container) {/* ... */}

/* 为挂载容器创建根节点(container._reactRootContainer) */
function legacyCreateRootFromDOMContainer(/* ... */): RootType {/* ... */}

/* 测试用：异常回调函数警告 */
function warnOnInvalidCallback(callback: mixed, callerName: string): void {/* ... */}

/* 将组件渲染到目标容器内 */
function legacyRenderSubtreeIntoContainer(/* ... */) {/* ... */}

export function findDOMNode(/* ... */): null | Element | Text {/* ... */}

export function hydrate(/* ... */) {/* ... */}

/* ReactDOM.render 原始方法 */
export function render(/* ... */) {/* ... */}

export function unstable_renderSubtreeIntoContainer(/* ... */) {/* ... */}

export function unmountComponentAtNode(container: Container) {/* ... */}
 