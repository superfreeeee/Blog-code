const SemVer = require('../classes/semver')
/**
 * 取 SemVer 类发布版本号 patch
 * @param {*} a
 * @param {*} loose
 * @returns
 */
// ? Read
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch
