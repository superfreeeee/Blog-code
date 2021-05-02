// object 类型检查
export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}