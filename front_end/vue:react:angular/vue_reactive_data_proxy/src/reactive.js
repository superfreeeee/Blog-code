import { isObject } from './utils'
import { baseHandlers } from './handlers'

// 保存`原始对象 -> 代理对象`的映射表
const proxyMap = new WeakMap()

/* 响应式对象（Proxy 实现），返回代理对象 */
export function reactive (target) {
  return createReactiveObject(target)
}

/* 创建响应式对象 */
function createReactiveObject (target) {
  // 目标必须是 object 类型
  if (!isObject(target)) return target
  // 同样的目标只需要创建一个代理
  if (proxyMap.has(target)) return proxyMap.get(target)
  
  // 创建代理对象
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy) // 使用 WeakMap 保存弱引用
  // 返回代理对象
  return proxy
}
