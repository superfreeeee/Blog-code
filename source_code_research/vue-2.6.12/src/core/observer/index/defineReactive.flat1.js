// 定义响应式数据

export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  /* 创建依赖管理对象(转发 Watcher 更新) */
  const dep = new Dep()

  // ensure prop configurable & value ...

  // 创建 Observer
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    /* 定义 reactive getter */
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    /* 定义 reactive setter */
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      // 检查新旧值差异
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      // check customSetter ...

      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 更新 Observer
      childOb = !shallow && observe(newVal)
      /* 由 dep 通知观察者进行更新 */
      dep.notify()
    }
  })
}