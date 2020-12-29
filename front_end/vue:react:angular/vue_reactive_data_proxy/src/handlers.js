import { isObject } from './utils'
import { reactive } from './reactive'
import { track, trigger } from './effect'

/* Proxy 代理方法 */
export const baseHandlers = {
  // 代理属性`访问`操作（例如：state.count）
  get (target, key, receiver) {
    track(target, key) // 追踪相关 effect 回调
    const res = Reflect.get(target, key, receiver)
    if (isObject(res)) {
      // 如果属性值也是对象，则返回响应式对象
      return reactive(res)
    } else {
      return res
    }
  },
  // 代理属性`赋值`操作（例如：state.count = 2）
  set (target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    // 赋值操作后触发所有相关 effect 回调
    trigger(target, key, value)
    return res
  },
  // 代理属性`删除`操作（例如：delete state.count）
  deleteProperty (target, key) {
    const hasKey = target.hasOwnProperty(key) // 检查属性是否存在
    const res = Reflect.deleteProperty(target, key) // 删除操作结果
    if (hasKey && res) {
      // 属性存在 且 删除成功才触发回调
      trigger(target, key, undefined)
    }
    return res
  }
}
