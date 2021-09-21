/**
 * ReactUpdateQueue allows for state updates to be scheduled into a later
 * reconciliation step.
 */
 var ReactUpdateQueue = {
  isMounted: function (publicInstance) {/* ... */},

  enqueueCallback: function (publicInstance, callback, callerName) {/* ... */},

  enqueueCallbackInternal: function (internalInstance, callback) {/* ... */},

  enqueueForceUpdate: function (publicInstance) {/* ... */},

  enqueueReplaceState: function (publicInstance, completeState, callback) {/* ... */},

  enqueueSetState: function (publicInstance, partialState) {/* ... */},

  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {/* ... */},

  /* 校验回调函数 */
  validateCallback: function (callback, callerName) {/* ... */}
};