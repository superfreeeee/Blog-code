/* 断言 batchingStrategy 注入 */
function ensureInjected() {
  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy)
    ? process.env.NODE_ENV !== 'production'
      ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching strategy')
      : _prodInvariant('123')
    : void 0;
}