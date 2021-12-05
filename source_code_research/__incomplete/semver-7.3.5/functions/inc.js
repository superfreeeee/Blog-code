const SemVer = require('../classes/semver');

/**
 * 递增版本号
 * @param {*} version 当前版本号
 * @param {*} release 递增层级
 * @param {*} options
 * @param {*} identifier
 * @returns
 */
// ? Read
const inc = (version, release, options, identifier) => {
  if (typeof options === 'string') {
    // 三参数：inc(version, release, identifier)
    identifier = options;
    options = undefined;
  }

  // 代理 SemVer.inc 方法
  try {
    return new SemVer(version, options).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};
module.exports = inc;
