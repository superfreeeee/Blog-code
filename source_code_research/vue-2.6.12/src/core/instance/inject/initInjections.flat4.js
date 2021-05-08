// 初始化注入属性

export function initInjections (vm: Component) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], /* setting injected value warning ... */)
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}