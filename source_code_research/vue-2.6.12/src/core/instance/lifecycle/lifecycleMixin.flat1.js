// 注入
//   Vue.prototype._update
//   Vue.prototype.$forceUpdate
//   Vue.prototype.$destroy

export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {/* ... */}

  Vue.prototype.$forceUpdate = function () {/* ... */}

  Vue.prototype.$destroy = function () {/* ... */}
}