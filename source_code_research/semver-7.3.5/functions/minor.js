const SemVer = require('../classes/semver')
/**
 * 取 SemVer 类次版本号 minor
 * @param {*} a
 * @param {*} loose
 * @returns
 */
// ? Read
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor
