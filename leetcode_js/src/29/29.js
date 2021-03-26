// build by generate.js

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  let sign = 1
  if (dividend < 0) {
    dividend = -dividend
    sign = -sign
  }
  if (divisor < 0) {
    divisor = -divisor
    sign = -sign
  }
  if (divisor > dividend) return 0
  let [times, mul_divisor] = [1, divisor]
  while (dividend > mul_divisor * 2) {
    times *= 2
    mul_divisor *= 2
  }
  times = sign * (times + divide(dividend - mul_divisor, divisor))
  const [min, max] = [-Math.pow(2, 31), Math.pow(2, 31) - 1]
  if (times < min || times > max) {
    return max
  } else {
    return times
  }
}

module.exports = {
  divide,
}
