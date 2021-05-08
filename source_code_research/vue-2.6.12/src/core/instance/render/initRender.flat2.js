// 初始化实例渲染相关属性、标志
//   Vue.prototype._vnode
//   Vue.prototype._staticTrees
//   Vue.prototype.$slots
//   Vue.prototype.$scopedSlots
//   Vue.prototype._c
//   Vue.prototype.$createElement
//   reactive Vue.prototype.$attrs
//   reactive Vue.prototype.$listeners

export function initRender (vm: Component) {
  // 子树根节点
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees

  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject

  /* 挂载创建虚拟 dom 节点的方法 */
  // args order: tag, data, children, normalizationType, alwaysNormalize
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // 暴露接口
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  /* $attrs, $listeners 变为响应式 */
  const parentData = parentVnode && parentVnode.data

  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}