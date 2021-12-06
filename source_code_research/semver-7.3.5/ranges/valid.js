const Range = require('../classes/range');

/**
 * 检查是否为合法 range 表达式
 * @param {*} range : ;
 * @param {*} options
 * @returns
 */
// ? Read
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*';
  } catch (er) {
    return null;
  }
};
module.exports = validRange;
