// Vue.prototype._render 渲染细节

export function renderMixin (Vue: Class<Component>) {
  /* 注入 render helpers */
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    // 保留父节点接入点
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      /* 递归创建 VNode */
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      // render exception handling ...
      // ensure vnode exists
      vnode = vm._vnode
    } finally {
      currentRenderingInstance = null
    }
    // 接受包含唯一一个 VNode 的数组
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // 保证 vnoe 存在
    if (!(vnode instanceof VNode)) {
      // multiple root node warning ...
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}
