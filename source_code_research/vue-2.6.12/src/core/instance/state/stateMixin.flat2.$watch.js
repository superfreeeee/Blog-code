// 注入 Vue.prototype.$watch

export function stateMixin (Vue: Class<Component>) {
  // dataDef, propsDef ...

  // set Vue.prototype.{$data, $props, $set, $delete} ...

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    /* 创建 Watcher 对象观察 expOrFn 对象 */
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    // 返回解除观察方法回调
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}
