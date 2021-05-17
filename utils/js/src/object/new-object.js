// new 关键字实现
export function newObject(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const ret = Ctor.apply(obj, args)
  return ret instanceof Object ? ret : obj
}
