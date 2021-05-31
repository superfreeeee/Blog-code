/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var DOMLazyTree = require('./DOMLazyTree');
var DOMProperty = require('./DOMProperty');
var React = require('react/lib/React');
var ReactBrowserEventEmitter = require('./ReactBrowserEventEmitter');
var ReactCurrentOwner = require('react/lib/ReactCurrentOwner');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactDOMContainerInfo = require('./ReactDOMContainerInfo');
var ReactDOMFeatureFlags = require('./ReactDOMFeatureFlags');
var ReactFeatureFlags = require('./ReactFeatureFlags');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactInstrumentation = require('./ReactInstrumentation');
var ReactMarkupChecksum = require('./ReactMarkupChecksum');
var ReactReconciler = require('./ReactReconciler');
var ReactUpdateQueue = require('./ReactUpdateQueue');
var ReactUpdates = require('./ReactUpdates');

var emptyObject = require('fbjs/lib/emptyObject');
var instantiateReactComponent = require('./instantiateReactComponent');
var invariant = require('fbjs/lib/invariant');
var setInnerHTML = require('./setInnerHTML');
var shouldUpdateReactComponent = require('./shouldUpdateReactComponent');
var warning = require('fbjs/lib/warning');

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var ROOT_ATTR_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;
var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

var instancesByReactRootID = {};

function firstDifferenceIndex(string1, string2) {/* ... */}

/* 从容器获取 React 根元素 */
function getReactRootElementInContainer(container) {/* ... */}

/* 获取元素 ID */
function internalGetID(node) {/* ... */}

function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {/* ... */}

function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {/* ... */}

function unmountComponentFromNode(instance, container, safely) {/* ... */}

/* 检查是否存在实例 */ 
function hasNonRootReactChild(container) {/* ... */}

function nodeIsRenderedByOtherInstance(container) {/* ... */}

/* 校验 DOM 元素容器 */
function isValidContainer(node) {/* ... */}

function isReactNode(node) {/* ... */}

/* 从容器获取宿主根元素实例 */
function getHostRootInstanceInContainer(container) {/* ... */}

/* 从容器获取顶层包装类 */
function getTopLevelWrapperInContainer(container) {/* ... */}

var topLevelRootCounter = 1;
var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};
TopLevelWrapper.prototype.isReactComponent = {};
if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}
TopLevelWrapper.prototype.render = function () {
  return this.props.child;
};
TopLevelWrapper.isReactTopLevelWrapper = true;

var ReactMount = {/* ... */};

module.exports = ReactMount;