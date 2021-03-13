// build by generate.js

String.prototype.reverse = function () {
  return this.split('').reverse().join('')
}

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false
  return String(x) === String(x).reverse()
}

module.exports = {
  isPalindrome,
}
