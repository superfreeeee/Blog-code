const outside = require('./outside');
// Determine if version is less than all the versions possible in the range
/**
 * 检查 version 是否 < range 区间内所有版本
 * @param {*} version
 * @param {*} range
 * @param {*} options
 * @returns
 */
// ? Read
const ltr = (version, range, options) => outside(version, range, '<', options);
module.exports = ltr;
