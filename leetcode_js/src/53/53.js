// build by generate.js

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let [pre, res] = [0, nums[0]]
  nums.forEach((num) => {
    pre = Math.max(pre + num, num)
    res = Math.max(res, pre)
  })
  return res
}

module.exports = { maxSubArray }
