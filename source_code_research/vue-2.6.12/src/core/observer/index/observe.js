// 观察目标(创建 Observer 对象，并更新 vmCount 值)

export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    // Observer 已经存在
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    // 重新创建
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    // 更新以该实例为根的 Vue 实例数量
    ob.vmCount++
  }
  return ob
}