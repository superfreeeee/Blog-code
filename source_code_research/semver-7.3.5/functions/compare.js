const SemVer = require('../classes/semver');
/**
 * 比较两个版本号
 *   分别构建 SemVer，然后使用 compare 方法比较
 * @param {*} a
 * @param {*} b
 * @param {*} loose
 * @returns
 */
// ? Read
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose));

module.exports = compare;
