// 将对象属性转化为响应式(Object.defineProperty.getter/setter)

 export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  // configurable === false 时不作为响应式属性
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // 获取原来的访问器(getter/setter)方法
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 递归观察属性值
  let childOb = !shallow && observe(val)

  // 重新设置访问器属性 getter/setter
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 根据原访问器获得值
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        // 将依赖加入当前运行的观察者
        dep.depend()
        if (childOb) {
          // 将对象值的依赖也加入当前观察者
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      // 新旧值比较
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      // customSetter ...

      if (getter && !setter) return // read-only property
      // 设置新值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }

      // 观察新值
      childOb = !shallow && observe(newVal)
      // 依赖通知所有观察者进行更新
      dep.notify()
    }
  })
}

// 遍历数组将对象值作为依赖加入当前观察者
 function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      // 递归添加依赖
      dependArray(e)
    }
  }
}
