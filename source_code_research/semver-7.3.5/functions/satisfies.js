const Range = require('../classes/range');
/**
 * 给定版本是否符合给定区间
 * @param {*} version
 * @param {*} range
 * @param {*} options
 * @returns
 */
// ? Read
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }
  return range.test(version);
};
module.exports = satisfies;
