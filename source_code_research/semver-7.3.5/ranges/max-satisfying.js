const SemVer = require('../classes/semver');
const Range = require('../classes/range');

/**
 * 找出最大的符合 range 条件的 version
 * @param {*} versions 
 * @param {*} range 
 * @param {*} options 
 * @returns 
 */
// ? Read
const maxSatisfying = (versions, range, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // v 处于 range 区间内
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        // maxSV < v => max = v
        max = v;
        maxSV = new SemVer(max, options);
      }
    }
  });
  return max;
};
module.exports = maxSatisfying;
