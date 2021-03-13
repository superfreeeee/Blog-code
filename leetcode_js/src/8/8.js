// build by generate.js

const [minInt, maxInt] = [-Math.pow(2, 31), Math.pow(2, 31) - 1]
const isNum = (c) => !isNaN(Number(c)) && c !== ' '

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trim()
  if (s[0] === '-' || s[0] === '+' || isNum(s[0])) {
    let index = 0
    let sign = s[0] === '-' ? -1 : 1
    let num = 0
    if (s[0] === '-' || s[0] === '+') index++
    while (index < s.length && isNum(s[index])) {
      num = num * 10 + Number(s[index])
      index++
      const res = sign * num
      if (res >= maxInt) return maxInt
      if (res <= minInt) return minInt
    }
    return sign * num
  } else {
    return 0
  }
}

module.exports = {
  myAtoi,
}
