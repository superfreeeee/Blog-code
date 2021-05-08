// 初始化实例事件队列

export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false

  // 更新父组件监听函数
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
