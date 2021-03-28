// build by generate.js

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const [n, m] = [s.length, p.length]
  const d = Array.from(Array(n + 1), () =>
    Array.from(Array(m + 1), () => false)
  )
  d[0][0] = true
  for (let i = 1; i <= m; i++) {
    if (p.charAt(i - 1) === '*') d[0][i] = true
    else break
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const c = p.charAt(j - 1)
      if (c === '*') {
        d[i][j] = d[i][j - 1] || d[i - 1][j]
      } else if (c === '?' || c === s.charAt(i - 1)) {
        d[i][j] = d[i - 1][j - 1]
      }
    }
  }
  return d[n][m]
}

module.exports = { isMatch }
