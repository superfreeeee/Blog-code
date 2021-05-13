import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/* 代理数组对象 */
methodsToPatch.forEach(function (method) {
  // 原始数组方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 代理数组方法
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 递归观察插入内容
    if (inserted) ob.observeArray(inserted)
    // 通知数组依赖管理器进行更新
    ob.dep.notify()
    return result
  })
})
