const SemVer = require('../classes/semver');
const Range = require('../classes/range');
const gt = require('../functions/gt');

/**
 * 返回符合区间的最小 SemVer
 * @param {*} range : ;
 * @param {*} loose
 * @returns
 */
// ? Read
const minVersion = (range, loose) => {
  range = new Range(range, loose);

  // 最小 version
  let minver = new SemVer('0.0.0');
  if (range.test(minver)) {
    return minver;
  }

  // 带 prerelease 最小
  minver = new SemVer('0.0.0-0');
  if (range.test(minver)) {
    return minver;
  }

  minver = null;
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i];

    let setMin = null;
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      // 用 comp 构建 SemVer
      const compver = new SemVer(comparator.semver.version);
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            // > path  => patch + 1
            compver.patch++;
          } else {
            // > pr => pr.0
            compver.prerelease.push(0);
          }
          // 重新格式化 compver
          compver.raw = compver.format();
        /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver;
          }
          break;
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break;
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`);
      }
    });
    if (setMin && (!minver || gt(minver, setMin)))
      // setMin < minver
      minver = setMin;
  }

  // 检查 miner 是否符合条件
  if (minver && range.test(minver)) {
    return minver;
  }

  return null;
};
module.exports = minVersion;
