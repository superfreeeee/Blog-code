/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var DOMProperty = require('./DOMProperty');
var ReactDOMComponentFlags = require('./ReactDOMComponentFlags');

var invariant = require('fbjs/lib/invariant');

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var Flags = ReactDOMComponentFlags;

var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);

/* 检查是否需要缓存节点 */
function shouldPrecacheNode(node, nodeID) {/* ... */}

/* 从组件获取渲染宿主(_renderedComponent)组件 */
function getRenderedHostOrTextFromComponent(component) {/* ... */}

/* 缓存节点实例 */
function precacheNode(inst, node) {/* ... */}

function uncacheNode(inst) {/* ... */}

/* 缓存所有子节点实例 */
function precacheChildNodes(inst, node) {/* ... */}

/* 从元素获取最近的实例 */
function getClosestInstanceFromNode(node) {/* ... */}

/* 从元素获取实例 */
function getInstanceFromNode(node) {/* ... */}

function getNodeFromInstance(inst) {/* ... */}

var ReactDOMComponentTree = {
  getClosestInstanceFromNode: getClosestInstanceFromNode,
  getInstanceFromNode: getInstanceFromNode,
  getNodeFromInstance: getNodeFromInstance,
  precacheChildNodes: precacheChildNodes,
  precacheNode: precacheNode,
  uncacheNode: uncacheNode
};

module.exports = ReactDOMComponentTree;