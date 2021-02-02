/**
 * 数据统计操作
 */

// 平均值
export const average = (...nums) =>
  nums.length > 0 ? nums.reduce((x, y) => x + y) / nums.length : 0

// 舍入到固定精度
export const toFixed = (n, fixed) =>
  Math.floor(Math.pow(10, fixed) * n) / Math.pow(10, fixed)

// 判断是否为偶数
export const isEven = (num) => num % 2 === 0

// 生成范围内随机整数
export const randomInt = (from = 0, to = 1) => {
  if (from >= to) return to
  return Math.floor(Math.random() * (to - from) + from)
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
