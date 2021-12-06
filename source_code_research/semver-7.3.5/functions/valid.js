const parse = require('./parse');
/**
 * 返回有效版本号 or null
 * @param {*} version
 * @param {*} options
 * @returns
 */
// ? Read
const valid = (version, options) => {
  const v = parse(version, options);
  // 解析成功则返回 v.version
  return v ? v.version : null;
};
module.exports = valid;
