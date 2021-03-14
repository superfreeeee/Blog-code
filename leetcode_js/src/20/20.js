// build by generate.js

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const temp = '([{)]}'
  const stack = []
  for (let c of s) {
    const code = temp.indexOf(c)
    if (code >= 3) {
      if (stack.length === 0 || code - stack[0] !== 3) return false
      stack.shift()
    } else {
      stack.unshift(code)
    }
  }
  return stack.length === 0
}

module.exports = {
  isValid,
}
