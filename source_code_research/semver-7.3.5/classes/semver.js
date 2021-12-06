const debug = require('../internal/debug');
const { MAX_LENGTH, MAX_SAFE_INTEGER } = require('../internal/constants');
const { re, t } = require('../internal/re');

const parseOptions = require('../internal/parse-options');
const { compareIdentifiers } = require('../internal/identifiers');

/**
 * 版本号解析类
 */
class SemVer {
  /**
   * 初始化版本号
   * options : 配置选项
   * loose             : 标志 - 是否使用放松规则
   * includePrerelease : 标志 - 是否附带预发版本
   * raw : 原始 version 版本号
   * major      : 主版本号
   * minor      : 次版本号
   * patch      : 更新版本号
   * prerelease : 预发版本号
   * build      : 构建版本号
   * @param {*} version
   * @param {*} options
   * @returns
   */
  // ? Read
  constructor(version, options) {
    options = parseOptions(options); // 解析配置参数

    if (version instanceof SemVer) {
      // 1. version 为 SemVer 实例
      if (
        version.loose === !!options.loose &&
        version.includePrerelease === !!options.includePrerelease
      ) {
        // loose 模式 && includePrerelease 模式下返回相同实例
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      // 保证 version 为字符串
      throw new TypeError(`Invalid Version: ${version}`);
    }

    if (version.length > MAX_LENGTH) {
      // 检查 verison 长度限制
      throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
    }

    // =============== 参数解析 ===============

    debug('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose;
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease;

    // 匹配版本号
    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }

    this.raw = version;

    // these are actually numbers
    this.major = +m[1]; // 主版本号
    this.minor = +m[2]; // 次版本号
    this.patch = +m[3]; // patch 版本号

    // 确保三个版本号皆为有效数字
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version');
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version');
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version');
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            // 纯数字预发版本
            return num;
          }
        }
        // 普通标识符版本
        return id;
      });
    }

    // build 版本
    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  /**
   * 解析后重新格式化
   * version : 解析后版本号
   * @returns
   */
  // ? Read
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`;
    }
    return this.version;
  }

  // ? 返回解析后版本号 this.version
  toString() {
    return this.version;
  }

  /**
   * 比较 SemVer 对象
   * @param {*} other
   * @returns
   */
  // ? Read
  compare(other) {
    debug('SemVer.compare', this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      // 非 SemVer 对象
      if (typeof other === 'string' && other === this.version) {
        // 简单比较一下字符串
        return 0;
      }
      // 转换成 SemVer 对象
      other = new SemVer(other, this.options);
    }

    // 比较 version
    if (other.version === this.version) {
      return 0;
    }

    // 先比较主版本再比较预发版本
    return this.compareMain(other) || this.comparePre(other);
  }

  /**
   * 比较主版本号：major、minor、patch
   * @param {*} other
   * @returns
   */
  // ? Read
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      // 非 SemVer 的先转换
      other = new SemVer(other, this.options);
    }

    // 按序比较 major、minor、patch
    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    );
  }

  /**
   * 比较预发版本号
   * @param {*} other
   * @returns
   */
  // ? Read
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      // 转换成 SemVer 对象
      other = new SemVer(other, this.options);
    }

    // NOT having a prerelease is > having one
    // 1. 先简单根据 length 比较，没有 prerelease 的最大
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }

    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      // prerelease 愈多组的优先级越高（相当于是 prerelease 里的 X < X.Y < X.Y.Z）
      if (a === undefined && b === undefined) {
        // 长度相同
        return 0;
      } else if (b === undefined) {
        // b 短  => a > b => 1
        return 1;
      } else if (a === undefined) {
        // a 短  => a < b => -1
        return -1;
      } else if (a === b) {
        // a,b 相同，比较下一个
        continue;
      } else {
        // a,b 非空且不同，比较 ID
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }

  /**
   * 比较 build 版本号
   * @param {*} other
   * @returns
   */
  // ? Read
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        // 长度相同  => 版本相同
        return 0;
      } else if (b === undefined) {
        // b 短  => a > b
        return 1;
      } else if (a === undefined) {
        // a 短  => a < b
        return -1;
      } else if (a === b) {
        // 版本号相同，比较下一个
        continue;
      } else {
        // 版本号不同
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }

  /**
   * 递增版本号
   * @param {*} release
   * @param {*} identifier
   * @returns
   */
  // ? Read
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier) {
    switch (release) {
      // ? Read
      case 'premajor':
        // 进到下一个主版本的预发
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break;

      // ? Read
      case 'preminor':
        // 进到下一个 minor 版本的预发
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break;

      // ? Read
      case 'prepatch':
        // 进到下一个 patch 版本的预发
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;

      // ? Read
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          // 当前不是预发时，操作与 patch 等价
          this.inc('patch', identifier);
        }
        this.inc('pre', identifier);
        break;

      // ? Read
      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          // 非预发版本时才 +1
          this.major++;
        }
        // minor、patch、prerelease 归零
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;

      // ? Read
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          // 非预发版本时才 +1
          this.minor++;
        }
        // patch、prerelease 归零
        this.patch = 0;
        this.prerelease = [];
        break;

      // ? Read
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          // 非预发版本时才 +1
          this.patch++;
        }
        // prerelease 归零
        this.prerelease = [];
        break;

      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          // 当前非预发
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          // 由后往前
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              // 遇到数字的递增
              this.prerelease[i]++;
              i = -2; // 跳出循环
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            // 指定 id 与当前预发 id 相同 => 将后面一个数字改为 0
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            // 其他任意情况改成 id.0
            this.prerelease = [identifier, 0];
          }
        }
        break;

      default:
        // 不合法参数
        throw new Error(`invalid increment argument: ${release}`);
    }
    // 重新构建版本号
    this.format();
    // 更新 raw
    this.raw = this.version;
    return this;
  }
}

module.exports = SemVer;
