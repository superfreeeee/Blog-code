const { MAX_LENGTH } = require('../internal/constants');
const { re, t } = require('../internal/re');
const SemVer = require('../classes/semver');

const parseOptions = require('../internal/parse-options');

/**
 * 解析版本号，返回 SemVer 对象
 * @param {*} version
 * @param {*} options
 * @returns SemVer
 */
// ? Read
const parse = (version, options) => {
  options = parseOptions(options);

  if (version instanceof SemVer) {
    // 传入 SemVer 直接返回
    return version;
  }

  if (typeof version !== 'string') {
    // version 必须为字符串类型
    return null;
  }

  if (version.length > MAX_LENGTH) {
    // 超过限制长度
    return null;
  }

  // ========== 以上为参数校验 ==========

  const r = options.loose ? re[t.LOOSE] : re[t.FULL];
  if (!r.test(version)) {
    // 字符串解析失败
    return null;
  }

  try {
    // 创建 SemVer 类型
    return new SemVer(version, options);
  } catch (er) {
    return null;
  }
};

module.exports = parse;
