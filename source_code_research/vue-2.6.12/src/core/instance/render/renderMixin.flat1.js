// 注入
//   Vue.prototype.$nextTick
//   Vue.prototype._render

export function renderMixin (Vue: Class<Component>) {
  /* 注入 render helpers */
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {/* ... */}

  Vue.prototype._render = function (): VNode {/* ... */}
}
