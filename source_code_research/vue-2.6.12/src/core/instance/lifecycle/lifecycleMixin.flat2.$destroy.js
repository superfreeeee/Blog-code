// Vue.prototype.$destroy 销毁 vdom 方法

export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {/* ... */}

  Vue.prototype.$forceUpdate = function () {/* ... */}

  Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) { // 避免重复调用
      return
    }
    callHook(vm, 'beforeDestroy') // beforeDestroy 生命周期钩子

    vm._isBeingDestroyed = true

    // 从父组件移除
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }

    // 解除绑定观察者
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }

    // 更新标志
    vm._isDestroyed = true
    /* __patch__ 方法将 vnode 置为 null */
    vm.__patch__(vm._vnode, null)
    callHook(vm, 'destroyed') // destroyed 生命周期钩子

    /* 关闭实例监听函数 */
    vm.$off()

    // 移除 __vue__ 标志
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // 移除父元素引用
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}