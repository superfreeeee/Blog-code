// 用于注入
//     Vue.prototype.$set
//     Vue.prototype.$del

export function set (target: Array<any> | Object, key: any, val: any): any {
  // target undefined, null, primitive warning ... 

  // set(array, key, val)
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // key already exists
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  const ob = (target: any).__ob__
  // target as _data warning ...
  // target 不是观察目标
  if (!ob) {
    target[key] = val
    return val
  }
  // target 是观察目标 -> 设置为响应式属性
  defineReactive(ob.value, key, val)
  // 通知依赖于 target 的进行更新
  ob.dep.notify()
  return val
}

export function del (target: Array<any> | Object, key: any) {
  // target undefined, null, primitive warning ... 

  // del(array, key, val)
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  // target as _data warning ...

  // key not exists
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  // 是观察目标则通知依赖于 target 的进行更新
  ob.dep.notify()
}
