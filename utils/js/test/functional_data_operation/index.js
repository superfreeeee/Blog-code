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
    console.log(Object.getOwnPropertyNames(obj))
    clone = new obj.constructor()
    Object.getOwnPropertyNames(obj).forEach(
      (prop) => (clone[prop] = deepClone(obj[prop]))
    )
  }
  return clone
}

//**********************/
console.log('--- test reverse ---')
const s = '123456'
console.log(`reverse(${s}) = ${reverse(s)}`)

console.log('--- test celsiusToFahrenheit ---')
const [c1, c2] = [32, -40]
console.log(`${c1}'C = ${celsiusToFahrenheit(c1)}'F`)
console.log(`${c2}'C = ${celsiusToFahrenheit(c2)}'F`)

console.log('--- test fahrenheitToCelsius ---')
const [f1, f2] = [89.6, -40]
console.log(`${f1}'F = ${fahrenheitToCelsius(f1)}'C`)
console.log(`${f2}'F = ${fahrenheitToCelsius(f2)}'C`)

console.log('--- test timeFromDate ---')
const d1 = new Date()
const d2 = new Date(2021, 0, 10, 17, 30, 0)
console.log(`timeFromDate(${d1}) = ${timeFromDate(d1)}`)
console.log(`timeFromDate(${d2}) = ${timeFromDate(d2)}`)

console.log('--- test pureSwap ---')
const arr = [1, 2, 3, 4, 5]
console.log(`pureSwap([${arr}], 1, 3) = ${pureSwap(arr, 1, 3)}`)

console.log('--- test deepClone ---')
const obj = {
  a: 123,
  b: [1, 2, 3],
  c: {
    d: '123',
    e: {
      f() {
        console.log('invoke f')
      },
    },
  },
}
console.log(`obj: ${obj}`)
const clone = deepClone(obj)
console.log(`clone: ${clone}`)
