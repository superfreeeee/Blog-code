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

var CallbackQueue = require('./CallbackQueue');
var PooledClass = require('./PooledClass');
var ReactFeatureFlags = require('./ReactFeatureFlags');
var ReactReconciler = require('./ReactReconciler');
var Transaction = require('./Transaction');

var invariant = require('fbjs/lib/invariant');

var dirtyComponents = [];
var updateBatchNumber = 0;
var asapCallbackQueue = CallbackQueue.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

/* 断言 batchingStrategy 注入 */
function ensureInjected() {/* ... */}

var NESTED_UPDATES = {/* ... */};

var UPDATE_QUEUEING = {/* ... */};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

/* 组件批量更新事务对象 */
function ReactUpdatesFlushTransaction() {/* ... */}

_assign(ReactUpdatesFlushTransaction.prototype, Transaction, {/* ... */});

PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

/* 批量更新组件 */
function batchedUpdates(callback, a, b, c, d, e) {/* ... */}

function mountOrderComparator(c1, c2) {/* ... */}

function runBatchedUpdates(transaction) {/* ... */}

var flushBatchedUpdates = function () {/* ... */};

function enqueueUpdate(component) {/* ... */}

function asap(callback, context) {/* ... */}

var ReactUpdatesInjection = {/* ... */};

var ReactUpdates = {
  /**
  * React references `ReactReconcileTransaction` using this property in order
  * to allow dependency injection.
  *
  * @internal
  */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

module.exports = ReactUpdates;