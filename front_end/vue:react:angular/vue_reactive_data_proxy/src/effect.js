/*
以 target => key => Set<activeEffect> 的形式
保存所有与 target[key] 相关联的 effect 回调
*/
const targetMap = new WeakMap()
let activeEffect

/* 追踪相关 effect 回调 */
export function track (target, key) {
  // 当前并不在任何 effect 回调之内，直接返回
  if (!activeEffect) return

  // 保证 targetMap[target] 存在（为一个 Map<key, Set<activeEffect>>）
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 保证 targetMap[target][key] 存在（为一个 Set<activeEffect>）
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  // 如果当前 effect 回调不存在，则加入
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect)
  }
}

/* 触发所有相关 effect 回调 */
export function trigger (target, key, newValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  // 找到 target[key] 相关的所有 effect 回调
  if (effects) {
    // 一一调用
    effects.forEach(effect => effect())
  }
}

/* 添加 effect 回调 */
export function effect (fn) {
  const effect = createReactiveEffect(fn)
  // 首次调用时直接触发第一次响应式回调
  return effect()
}

// effect 回调调用栈
const effectStack = []

/* 触发所有相关 effect 回调 */
function createReactiveEffect (fn) {
  // 创建响应式回调函数
  const effect = function reactiveEffect () {
    if (!effectStack.includes(effect)) {
      // 防止递归调用，利用调用栈
      try {
        effectStack.push(effect)
        activeEffect = effect // activeEffect 表示当前正在执行的 effect 回调
        return fn() // 实际执行回调
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1] //恢复 activeEffect 标志位
      }
    }
  }
  return effect
}
