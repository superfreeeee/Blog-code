const parse = require('./parse');
/**
 * 返回预发版本号数组
 * @param {*} version
 * @param {*} options
 * @returns
 */
// ? Read
const prerelease = (version, options) => {
  const parsed = parse(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = prerelease;
