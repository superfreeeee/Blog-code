/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactCompositeComponent = require('./ReactCompositeComponent');
var ReactEmptyComponent = require('./ReactEmptyComponent');
var ReactHostComponent = require('./ReactHostComponent');

var getNextDebugID = require('react/lib/getNextDebugID');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

// To avoid a cyclic dependency, we create the final class in this module
/* 创建 React 节点包装类 */
var ReactCompositeComponentWrapper = function (element) {/* ... */};

function getDeclarationErrorAddendum(owner) {/* ... */}

/* 判断是否为 React 内置组件类型 */
function isInternalComponentType(type) {/* ... */}

/* 初始化 React 组件 */
function instantiateReactComponent(node, shouldHaveDebugID) {/* ... */}

_assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
  _instantiateReactComponent: instantiateReactComponent
});

module.exports = instantiateReactComponent;