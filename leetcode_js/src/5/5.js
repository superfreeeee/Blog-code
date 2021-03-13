const centerSpread = function (s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--
    right++
  }
  return s.substring(left + 1, right)
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = ''
  for (let i = 0; i < s.length; i++) {
    const oddStr = centerSpread(s, i, i)
    const evenStr = centerSpread(s, i, i + 1)
    if (oddStr.length > res.length) res = oddStr
    if (evenStr.length > res.length) res = evenStr
  }
  return res
}

module.exports = {
  longestPalindrome,
}
