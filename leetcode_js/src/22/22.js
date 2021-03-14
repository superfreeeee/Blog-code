// build by generate.js

const combine = (pos1, pos2) => {
  const pos = []
  for (const p1 of pos1) {
    for (const p2 of pos2) {
      pos.push(`(${p1})${p2}`)
    }
  }
  return pos
}
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n <= 0) return []
  const pos = [[''], ['()']]
  for (let i = 2; i <= n; i++) {
    pos.push([])
    for (let l1 = 0; l1 <= i - 1; l1++) {
      const l2 = i - 1 - l1
      pos[i] = pos[i].concat(combine(pos[l1], pos[l2]))
    }
  }
  return pos[n]
}

const generateParenthesis2 = function (n) {
  const result = []
  const f = function (left, right, s) {
    if (left === 0 && right === 0) {
      result.push(s)
    } else {
      if (left > 0) {
        f(left - 1, right, s + '(')
      }
      if (left < right) {
        f(left, right - 1, s + ')')
      }
    }
  }
  f(n, n, '')
  return result
}

module.exports = {
  generateParenthesis,
  generateParenthesis2,
}
