/**
 * 数据统计操作
 */

// 平均值
export const average = (...nums) =>
  nums.length > 0 ? nums.reduce((x, y) => x + y) / nums.length : 0

// 舍入到固定精度
export const toFixed = (n, fixed) =>
  ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)

// 判断是否为偶数
export const isEven = (num) => num % 2 === 0

// 生成范围内随机整数
export const randomInt = (from = 0, to = 1) => {
  if (from >= to) return to
  return ~~(Math.random() * (to - from) + from)
}

// range 生成函数
export const range = (maxOrStart, end, step = 1) => {
  if (end === undefined) {
    end = maxOrStart
    maxOrStart = 0
  }
  return Array.from(
    { length: Math.ceil((end - maxOrStart) / step) },
    (_, i) => maxOrStart + step * i
  )
}

/*********************************** */

console.log('--- test average ---')
const nums = [1, 2, 3, 4, 5]
console.log(`nums: ${nums}, average(nums) = ${average(...nums)}`)

console.log('--- test toFixed ---')
const n = 1.23456789
console.log(`toFixed(${n}, 1) = ${toFixed(n, 1)}`)
console.log(`toFixed(${n}, 2) = ${toFixed(n, 2)}`)
console.log(`toFixed(${n}, 3) = ${toFixed(n, 3)}`)
console.log(`toFixed(${n}, 4) = ${toFixed(n, 4)}`)
console.log(`toFixed(${n}, 5) = ${toFixed(n, 5)}`)
console.log(`toFixed(${n}, 6) = ${toFixed(n, 6)}`)

console.log('--- test isEven ---')
console.log(`isEven(1) = ${isEven(1)}`)
console.log(`isEven(2) = ${isEven(2)}`)

console.log('--- test randomInt ---')
new Array(10)
  .fill(0)
  .forEach((x) => console.log(`randomInt(0, 100) = ${randomInt(0, 100)}`))

console.log('--- test range ---')
console.log(`range(10) = ${range(10)}`)
console.log(`range(5, 10) = ${range(5, 10)}`)
console.log(`range(5, 10, 2) = ${range(5, 10, 2)}`)
