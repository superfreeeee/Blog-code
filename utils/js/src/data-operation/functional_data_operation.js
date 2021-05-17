/**
 * 数据操作相关函数
 */

// 字符串反转
export const reverse = (s) => s.split('').reverse().join('')

// 从日期获取时间
export const timeFromDate = (date) => date.toTimeString().slice(0, 8)

// 摄氏温度 转 华氏温度
export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32
// 华氏温度 转 摄氏温度
export const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9

// 数组元素交换
export const pureSwap = (arr, i, j) => {
  arr = [...arr]
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
  return arr
}

// 深拷贝
export const deepClone = (obj) => {
  let clone = obj
  if (obj && typeof obj === 'object') {
    clone = new obj.constructor()
    Object.getOwnPropertyNames(obj).forEach(
      (prop) => (clone[prop] = deepClone(obj[prop]))
    )
  }
  return clone
}
