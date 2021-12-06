const Range = require('../classes/range');
/**
 * 检查两个 range 是否相交（直接代理 Range.intersects 方法）
 * @param {*} r1
 * @param {*} r2
 * @param {*} options
 * @returns
 */
// ? Read
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options);
  r2 = new Range(r2, options);
  return r1.intersects(r2);
};
module.exports = intersects;
