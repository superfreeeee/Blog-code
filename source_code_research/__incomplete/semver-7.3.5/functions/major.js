const SemVer = require('../classes/semver');
/**
 * 取 SemVer 类主版本号 major
 * @param {*} a
 * @param {*} loose
 * @returns
 */
// ? Read
const major = (a, loose) => new SemVer(a, loose).major;
module.exports = major;
