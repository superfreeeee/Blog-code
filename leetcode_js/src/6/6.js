/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) return s
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push([])
  }
  for (let i = 0; i < s.length; i++) {
    let target = i % (2 * numRows - 2)
    if (target >= numRows) {
      target = numRows - 2 - (target - numRows)
    }
    rows[target].push(s[i])
  }
  return rows.map((row) => row.join('')).reduce((s1, s2) => s1 + s2)
}

module.exports = {
  convert,
}
