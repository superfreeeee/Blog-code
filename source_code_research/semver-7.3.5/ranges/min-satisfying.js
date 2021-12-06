const SemVer = require('../classes/semver');
const Range = require('../classes/range');

/**
 * 找出最小的符合 range 条件的 version
 * @param {*} versions
 * @param {*} range
 * @param {*} options
 * @returns
 */
// ? Read
const minSatisfying = (versions, range, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, options);
      }
    }
  });
  return min;
};
module.exports = minSatisfying;
