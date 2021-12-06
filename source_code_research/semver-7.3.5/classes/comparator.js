// 任意 SemVer 版本号
const ANY = Symbol('SemVer ANY');

/**
 * 比较类型
 *   保存目标范围（比较符号 + 比价版本）
 *   test       测试给定版本号是否符合当前 Comparator
 *   intersects 检查两个 Comparator 是否存在交集
 */
// ? Read
// hoisted class for cyclic dependency
class Comparator {
  // ? getter for Symbol('SemVer ANY')
  static get ANY() {
    return ANY;
  }

  /**
   * 构造函数
   * options : 配置选项
   * loose   : 模糊模式
   * value   : 比较符号 + 比较目标版本号
   * @param {*} comp
   * @param {*} options
   * @returns
   */
  // ? Read
  constructor(comp, options) {
    options = parseOptions(options);

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }

    // ========== 参数校验 ==========

    debug('comparator', comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);

    // 值 = 比较符号 + 比较目标版本号
    if (this.semver === ANY) {
      this.value = '';
    } else {
      this.value = this.operator + this.semver.version;
    }

    debug('comp', this);
  }

  /**
   * 解析比较字符串
   * operator : 比较符号
   * semver   : 比较目标版本号
   * @param {*} comp
   */
  // ? Read
  parse(comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const m = comp.match(r);

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`);
    }

    this.operator = m[1] !== undefined ? m[1] : '';
    if (this.operator === '=') {
      // = 等价于空
      this.operator = '';
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      // 无版本号  => 匹配任意版本
      this.semver = ANY;
    } else {
      // 构建比较目标
      this.semver = new SemVer(m[2], this.options.loose);
    }
  }

  // ? toString => value
  toString() {
    return this.value;
  }

  /**
   * 检验传入版本号是否符合条件
   * @param {*} version
   * @returns
   */
  // ? Read
  test(version) {
    debug('Comparator.test', version, this.options.loose);

    // ANY 怎么比都对
    if (this.semver === ANY || version === ANY) {
      return true;
    }

    // version 转 SemVer
    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }

    // 使用 cmp 比较 version 与目标版本号 semver
    return cmp(version, this.operator, this.semver, this.options);
  }

  /**
   * 检验两个版本号是否相交（交集 != null）
   * @param {*} comp
   * @param {*} options
   * @returns
   */
  // ? Read
  intersects(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required');
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false,
      };
    }

    // ========== 参数校验 ==========

    // 其中一方无比较符号 => 作为 Range.test 参数
    if (this.operator === '') {
      // this 无比较函数
      if (this.value === '') {
        // value 为空 === ANY ===> true
        return true;
      }
      // 创建 Range 类比较
      return new Range(comp.value, options).test(this.value);
    } else if (comp.operator === '') {
      // comp 无比较函数
      if (comp.value === '') {
        return true;
      }
      return new Range(this.value, options).test(comp.semver);
    }

    // 标志
    // 都是 > or >=
    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>');
    // 都是 < or <=
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<');
    // version 相同
    const sameSemVer = this.semver.version === comp.semver.version;
    // 都是 ?=
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=');
    // this < comp && this 为 > && comp 为 <
    // 即 this.version <= this <= comp <= comp.version
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '<=' || comp.operator === '<');
    // this > comp && this 为 < && comp 为 >
    // 即 comp.version <= comp <= this <= this.version
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '>=' || comp.operator === '>');

    return (
      // 方向相同
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      // 版本相同且都带 =
      (sameSemVer && differentDirectionsInclusive) ||
      // 方向存在交集
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    );
  }
}

module.exports = Comparator;

const parseOptions = require('../internal/parse-options');
const { re, t } = require('../internal/re');
const cmp = require('../functions/cmp');
const debug = require('../internal/debug');
const SemVer = require('./semver');
const Range = require('./range');
