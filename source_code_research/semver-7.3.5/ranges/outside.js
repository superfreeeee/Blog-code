const SemVer = require('../classes/semver');
const Comparator = require('../classes/comparator');
const { ANY } = Comparator;
const Range = require('../classes/range');
const satisfies = require('../functions/satisfies');
const gt = require('../functions/gt');
const lt = require('../functions/lt');
const lte = require('../functions/lte');
const gte = require('../functions/gte');

/**
 * 检查目标 version 是否在 range 范围外
 * @param {*} version
 * @param {*} range
 * @param {*} hilo
 * @param {*} options
 * @returns
 */
// ? Read
const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options);
  range = new Range(range, options);

  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // ========== 参数校验 ==========

  // If it satisfies the range it is not outside
  // 符合 range  => false
  if (satisfies(version, range, options)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i];

    let high = null;
    let low = null;

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        // ANY 转为 >=0.0.0
        comparator = new Comparator('>=0.0.0');
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, options)) {
        // gtfn 取上界
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, options)) {
        // ltfn 取下界
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      // 上界与当前方向相同，则属于内部
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    // 下界方向相同，且 verison 在范围内
    if (
      (!low.operator || low.operator === comp) &&
      ltefn(version, low.semver)
    ) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  // 目标 version 在范围外
  return true;
};

module.exports = outside;
