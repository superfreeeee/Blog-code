// build by generate.js

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  if (!height || height.length <= 1) return 0
  const res = []
  let cur = 0
  const n = height.length
  for (let i = 0; i < n; i++) {
    cur = Math.max(cur, height[i])
    res.push(cur - height[i])
  }
  cur = 0
  for (let i = n - 1; i >= 0; i--) {
    cur = Math.max(cur, height[i])
    res[i] = Math.min(res[i], cur - height[i])
  }
  return res.reduce((x, y) => x + y)
}

module.exports = { trap }
