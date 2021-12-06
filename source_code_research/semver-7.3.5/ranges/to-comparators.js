const Range = require('../classes/range');

/**
 * range 表达式转 comparators[]（测试用）
 * @param {*} range : ;
 * @param {*} options
 * @returns
 */
// ? Read
// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set.map((comp) =>
    comp
      .map((c) => c.value)
      .join(' ')
      .trim()
      .split(' ')
  );

module.exports = toComparators;
