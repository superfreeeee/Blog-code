// build by generate.js

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses_pointer = function (s) {
  let [left, right] = [0, 0]
  let maxLen = 0
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '(') {
      left++
    } else {
      right++
    }
    if (left === right) {
      maxLen = Math.max(maxLen, left * 2)
    } else if (right > left) {
      left = 0
      right = 0
    }
  }
  left = right = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.charAt(i) === '(') {
      left++
    } else {
      right++
    }
    if (left === right) {
      maxLen = Math.max(maxLen, left * 2)
    } else if (left > right) {
      left = 0
      right = 0
    }
  }
  return maxLen
}

module.exports = { longestValidParentheses: longestValidParentheses_pointer }
