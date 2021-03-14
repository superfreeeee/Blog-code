// build by generate.js

const match = (s, p, i, j) =>
  i != 0 && (p.charAt(j - 1) === '.' || p.charAt(j - 1) === s.charAt(i - 1))

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const m = s.length,
    n = p.length
  const f = Array.from(Array(m + 1), () =>
    Array.from(Array(n + 1), () => false)
  )
  f[0][0] = true
  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p.charAt(j - 1) === '*') {
        f[i][j] = f[i][j - 2]
        if (match(s, p, i, j - 1)) {
          f[i][j] = f[i][j] || f[i - 1][j]
        }
      } else {
        if (match(s, p, i, j)) {
          f[i][j] = f[i - 1][j - 1]
        }
      }
    }
  }
  return f[m][n]
}

module.exports = {
  isMatch,
}
