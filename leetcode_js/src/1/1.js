/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const rec = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num in rec) {
      return [rec[num], i];
    } else {
      const rest = target - num;
      rec[rest] = i;
    }
  }
  return [-1, -1];
};
