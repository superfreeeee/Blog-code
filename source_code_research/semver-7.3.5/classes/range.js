// hoisted class for cyclic dependency
class Range {
  /**
   * 构造函数
   * raw     : 原始字符串
   * set     : 范围集合
   * options : 配置选项
   * loose             : 标志 - 简易模式
   * includePrerelease : 标志 - 是否包含预发版本
   * set     : Comparator[] 范围数组
   * @param {*} range : ;
   * @param {*} options
   * @returns
   */
  // ? Read
  constructor(range, options) {
    options = parseOptions(options);

    if (range instanceof Range) {
      // 拷贝构造
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }

    if (range instanceof Comparator) {
      // 使用 Comparator 构造
      // just put it in the set and return
      this.raw = range.value;
      this.set = [[range]];
      this.format();
      return this;
    }

    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;

    // First, split based on boolean or ||
    this.raw = range;
    this.set = range
      .split(/\s*\|\|\s*/) // 按 || 划分
      // map the range to a 2d array of comparators
      .map((range) => this.parseRange(range.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter((c) => c.length);

    // 范围数组不可为空
    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`);
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0];
      this.set = this.set.filter((c) => !isNullSet(c[0])); // 过滤空范围
      if (this.set.length === 0) this.set = [first];
      // 保留第一个串
      else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]; // 匹配任意版本
            break;
          }
        }
      }
    }

    this.format();
  }

  /**
   * 格式化，生成范围序列
   * => comp comp comp || comp comp
   * range : 空格 or || 间隔连续返回字符串
   * @returns
   */
  // ? Read
  format() {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim();
      })
      .join('||')
      .trim();
    return this.range;
  }

  // ? toString === range
  toString() {
    return this.range;
  }

  /**
   * 解析范围字符串 => Comparator[]
   * @param {*} range : ;
   * @returns
   */
  // ? Read
  parseRange(range) {
    range = range.trim();

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',');
    const memoKey = `parseRange:${memoOpts}:${range}`; // 'parseRange : options 序列 : range' 作缓存 key
    const cached = cache.get(memoKey);
    if (cached) return cached; // 是否已缓存

    const loose = this.options.loose;

    // 转义连字号写法
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug('hyphen replace', range);

    // 裁剪空格
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[t.COMPARATORTRIM]);

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);

    // 聚合空白符
    // normalize spaces
    range = range.split(/\s+/).join(' ');

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const rangeList = range
      .split(' ')
      .map((comp) => parseComparator(comp, this.options)) // 转义特殊字符
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map((comp) => replaceGTE0(comp, this.options)) // 转义 0.0.0
      // in loose mode, throw out any that are not valid comparators
      .filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => true) // 舍去 loose 模式下不合法比较符号
      .map((comp) => new Comparator(comp, this.options)); // 构建 Comparator 数组

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const l = rangeList.length;
    const rangeMap = new Map();
    for (const comp of rangeList) {
      if (isNullSet(comp)) return [comp]; // 存在空集合  => 直接返回
      rangeMap.set(comp.value, comp); // value => comp
    }
    if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete(''); // 移除 '' 通配符

    const result = [...rangeMap.values()];
    cache.set(memoKey, result); // key => Comparator[]
    return result;
  }

  /**
   * 检查两个 range 是否交集
   * @param {*} range : ;
   * @param {*} options
   * @returns
   */
  // ? Read
  intersects(range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required');
    }

    // this.set
    return this.set.some((thisComparators) => {
      return (
        // this Comparators
        isSatisfiable(thisComparators, options) &&
        // range.set
        range.set.some((rangeComparators) => {
          return (
            // range Comparators
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                // 检查 this 与 range 存在交集
                return thisComparator.intersects(rangeComparator, options);
              });
            })
          );
        })
      );
    });
  }

  /**
   * 检验 verison 是否符合当前 range 条件
   * @param {*} version
   * @returns
   */
  // ? Read
  // if ANY of the sets match ALL of its comparators, then pass
  test(version) {
    if (!version) {
      return false;
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }

    // ========== 参数校验 ==========

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }
    return false;
  }
}
module.exports = Range;

// ? 使用 LRU Cache 缓存 Ranges
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000 });

const parseOptions = require('../internal/parse-options');
const Comparator = require('./comparator');
const debug = require('../internal/debug');
const SemVer = require('./semver');
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = require('../internal/re');

// ? 空 range 集合
const isNullSet = (c) => c.value === '<0.0.0-0';
// ? 匹配任意版本
const isAny = (c) => c.value === '';

/**
 * 检查范围空间是否不为空
 * @param {*} comparators
 * @param {*} options
 * @returns
 */
// ? Read
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      // 取一个与剩余的比较
      return testComparator.intersects(otherComparator, options);
    });

    testComparator = remainingComparators.pop();
  }

  return result;
};

/**
 * 解析特殊符号，还原为正常比较符号
 * @param {*} comp
 * @param {*} options
 * @returns
 */
// ? Read
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options);
  comp = replaceCarets(comp, options); // 转义 ^ 写法
  debug('caret', comp);
  comp = replaceTildes(comp, options); // 转义 ~ 写法
  debug('tildes', comp);
  comp = replaceXRanges(comp, options); // 转义 x / * 通配符
  debug('xrange', comp);
  comp = replaceStars(comp, options); // 转义 * 写法
  debug('stars', comp);
  return comp;
};

// ? x / * 标识任意数字
const isX = (id) => !id || id.toLowerCase() === 'x' || id === '*';

// ? 转义 ~ 写法
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const replaceTildes = (comp, options) =>
  comp
    .trim()
    .split(/\s+/)
    .map((comp) => {
      return replaceTilde(comp, options);
    })
    .join(' ');

/**
 * 解析 ~ 语法（上界为 minor + 1）
 * @param {*} comp
 * @param {*} options
 * @returns
 */
// ? Read
const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr);
    let ret;

    if (isX(M)) {
      // major 任意  => ''
      ret = '';
    } else if (isX(m)) {
      // minor 任意  => max major + 1
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      // patch 任意  => max minor + 1
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
    } else if (pr) {
      // 预发存在   => max minor + 1
      debug('replaceTilde pr', pr);
      ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
    } else {
      // 只有主版本号  => minor + 1
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
    }

    debug('tilde return', ret);
    return ret;
  });
};

// ? Read
// 转义 ^ 写法
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const replaceCarets = (comp, options) =>
  comp
    .trim()
    .split(/\s+/)
    .map((comp) => {
      return replaceCaret(comp, options);
    })
    .join(' ');

/**
 * 解析 ^ 语法（上界为 major + 1）
 * @param {*} comp
 * @param {*} options
 * @returns
 */
// ? Read
const replaceCaret = (comp, options) => {
  debug('caret', comp, options);
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
  const z = options.includePrerelease ? '-0' : '';
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr);
    let ret;

    if (isX(M)) {
      // major 任意
      ret = '';
    } else if (isX(m)) {
      // minor 任意  => 上界为 minor + 1
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      // patch 任意
      if (M === '0') {
        // major = 0  => 上界为 minor + 1
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
      } else {
        // major != 0  => 上界为 major + 1
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
      }
    } else if (pr) {
      // prerelease 不为空
      debug('replaceCaret pr', pr);
      if (M === '0') {
        // major 为 0
        if (m === '0') {
          // major = minor = 0  => 上界为 patch + 1
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
        } else {
          // minor != 0  => 上界为 minor + 1
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        }
      } else {
        // major != 0  => 上界为 minor + 1
        ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
      }
    } else {
      // 只有主版本号的情况
      debug('no pr');
      if (M === '0') {
        if (m === '0') {
          // major = minor = 0  => max patch + 1
          ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
        } else {
          // major = 0, minor != 0  => max minor + 1
          ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
        }
      } else {
        // major != 0  => max major + 1
        ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
      }
    }

    debug('caret return', ret);
    return ret;
  });
};

// ? 转义通配符
const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options);
  return comp
    .split(/\s+/)
    .map((comp) => {
      return replaceXRange(comp, options);
    })
    .join(' ');
};

/**
 * 解析通配符 x / *（向上对齐一个版本）
 * @param {*} comp
 * @param {*} options
 * @returns
 */
// ? Read
const replaceXRange = (comp, options) => {
  comp = comp.trim();
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    const xM = isX(M); //       任意 major
    const xm = xM || isX(m); // 任意 major or minor
    const xp = xm || isX(p); // 任意 major or minor or patch
    const anyX = xp; //         存在 x

    // = 跟 '' 一样
    if (gtlt === '=' && anyX) {
      gtlt = '';
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : '';

    if (xM) {
      // 任意 major
      if (gtlt === '>' || gtlt === '<') {
        // > or < 任意  => nothing
        // nothing is allowed
        ret = '<0.0.0-0';
      } else {
        // = 全匹配
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // 存在比较符号与某 x
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0;
      }
      p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // > 向上对齐一个版本
        gtlt = '>=';
        if (xm) {
          // 任意 major or minor  => max major + 1
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        // <= 向上对齐
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }

      if (gtlt === '<') pr = '-0';

      ret = `${gtlt + M}.${m}.${p}${pr}`;
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
    }

    debug('xRange return', ret);

    return ret;
  });
};

// ? * 改为缺省实现
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '');
};

/**
 * 0.0.0 与 ANY 等价
 * @param {*} comp
 * @param {*} options
 * @returns
 */
// ? Read
const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options);
  return comp
    .trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
};

// ? Read
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
// 连字号写法替换成区间序列
const hyphenReplace =
  (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    // incPr = includePrerelease
    // from = 前区间
    // fM   = from major
    // fm   = from minor
    // fp   = from patch
    // fpr  = from prerelease
    // fb   = from build
    // to 等价

    // 更新 from 与 to
    if (isX(fM)) {
      // major 任意  => ''
      from = '';
    } else if (isX(fm)) {
      // minor 任意  => '>= major'
      from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
    } else if (isX(fp)) {
      // patch 任意  => '>= major.minor.0'
      from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
    } else if (fpr) {
      // prerelease 存在  => '>= M.m.p'
      from = `>=${from}`;
    } else {
      // 只有主版本号的情况
      from = `>=${from}${incPr ? '-0' : ''}`;
    }

    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }

    // 'v1 - v2' => '>=v1 <=v2'
    return `${from} ${to}`.trim();
  };

/**
 * 检验 version 是否符合 range 条件
 * @param {*} set
 * @param {*} version
 * @param {*} options
 * @returns
 */
// ? Read
const testSet = (set, version, options) => {
  // 检验 version 符合 set 中所有 comp
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }

  // 不符合 option 的 prerelease
  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === Comparator.ANY) {
        // ANY 直接过
        continue;
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver;
        if (
          allowed.major === version.major &&
          allowed.minor === version.minor &&
          allowed.patch === version.patch
        ) {
          // version 与 set 同时都有 prerelease
          return true;
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
};
