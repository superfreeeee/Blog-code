// build by generate.js

/**
 * @param {string} s
 * @return {number}
 */
//  字符          数值
//  I             1
//  V             5
//  X             10
//  L             50
//  C             100
//  D             500
//  M             1000

var romanToInt = function (s) {
  if (s.length === 0) return 0
  const romanMapper = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let res = romanMapper[s[0]]
  for (let i = 1; i < s.length; i++) {
    if (romanMapper[s[i - 1]] < romanMapper[s[i]]) {
      res -= 2 * romanMapper[s[i - 1]]
    }
    res += romanMapper[s[i]]
  }
  return res
}

module.exports = { romanToInt }
