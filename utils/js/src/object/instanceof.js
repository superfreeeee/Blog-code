// instanceof 关键字实现
export function _instanceof(obj, target) {
  let proto = obj.__proto__ || Object.getPrototypeOf(obj)
  const targetProto = target.prototype
  while (proto) {
    if (proto === targetProto) return true
    proto = proto.__proto__ || Object.getPrototypeOf(obj)
  }
  return false
}
