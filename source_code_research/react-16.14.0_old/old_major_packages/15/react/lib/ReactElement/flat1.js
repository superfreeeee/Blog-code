/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var warning = require('fbjs/lib/warning');
var canDefineProperty = require('./canDefineProperty');
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {/* ... */}

function hasValidKey(config) {/* ... */}

function defineKeyPropWarningGetter(props, displayName) {/* ... */}

function defineRefPropWarningGetter(props, displayName) {/* ... */}

var ReactElement = function (type, key, ref, self, source, owner, props) {/* ... */};

ReactElement.createElement = function (type, config, children) {/* ... */};

ReactElement.createFactory = function (type) {/* ... */};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {/* ... */};

ReactElement.cloneElement = function (element, config, children) {/* ... */};

/* 验证 React 元素 */
ReactElement.isValidElement = function (object) {/* ... */};

module.exports = ReactElement;