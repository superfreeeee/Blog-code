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
  let res = 0
  while (dividend > divisor) {
    dividend -= divisor
    res++
  }
  return sign * res
}

module.exports = {
  divide,
}
