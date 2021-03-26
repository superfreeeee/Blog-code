// build by generate.js

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS_dp = function (nums) {
  const n = nums.length
  const dp = []
  for (let i = 0; i < n; i++) {
    let tmp = 1
    for (let j = 0; j < i; j++) {
      tmp = nums[j] < nums[i] ? Math.max(tmp, dp[j] + 1) : tmp
    }
    dp.push(tmp)
  }
  return Math.max(...dp)
}

var lengthOfLIS_greedy = function (nums) {
  if (!nums || nums.length === 0) return 0
  const d = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    let j = d.length
    const num = nums[i]
    while (j > 0 && d[j - 1] >= num) {
      j--
    }
    d[j] = num
  }
  return d.length
}

module.exports = { lengthOfLIS: lengthOfLIS_greedy }
