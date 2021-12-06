// Determine if version is greater than all the versions possible in the range.
const outside = require('./outside');
/**
 * 检查 version 是否 > range 区间内所有版本
 * @param {*} version
 * @param {*} range
 * @param {*} options
 * @returns
 */
// ? Read
const gtr = (version, range, options) => outside(version, range, '>', options);
module.exports = gtr;
