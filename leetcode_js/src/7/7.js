const maxInt = Math.pow(2, 31) - 1
const minInt = -Math.pow(2, 31)

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const sign = x < 0 ? -1 : 1
  x = x * sign
  let num = 0
  while (x > 0) {
    num = num * 10 + (x % 10)
    x = Math.floor(x / 10)
    if (num >= maxInt || sign * num <= minInt) {
      return 0
    }
  }
  return sign * num
}

module.exports = {
  reverse,
}
