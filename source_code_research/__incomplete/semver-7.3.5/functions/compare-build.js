const SemVer = require('../classes/semver');
/**
 * 比较 build 版本号
 * @param {*} a
 * @param {*} b
 * @param {*} loose
 * @returns
 */
// ? Read
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose);
  const versionB = new SemVer(b, loose);
  // 先 compare 后 compareBuild
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = compareBuild;
