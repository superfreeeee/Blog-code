// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = require('../functions/satisfies.js');
const compare = require('../functions/compare.js');

/**
 * 返回最简化区间
 * @param {*} versions
 * @param {*} range
 * @param {*} options
 * @returns
 */
// ? Read
module.exports = (versions, range, options) => {
  const set = [];
  let min = null;
  let prev = null;
  // version 排序
  const v = versions.sort((a, b) => compare(a, b, options));
  for (const version of v) {
    const included = satisfies(version, range, options);
    if (included) {
      prev = version;
      if (!min) min = version; // 第一个符合条件的为下界
      // 下界
    } else {
      if (prev) {
        // 不符合条件的下界
        set.push([min, prev]); // 离开条件的为上界
      }
      prev = null;
      min = null;
    }
  }
  if (min) set.push([min, null]);

  const ranges = [];
  for (const [min, max] of set) {
    // 按上下界构建范围序列
    if (min === max) ranges.push(min);
    else if (!max && min === v[0]) ranges.push('*'); // 全符合
    else if (!max) ranges.push(`>=${min}`); // >= min
    else if (min === v[0]) ranges.push(`<=${max}`); // <= max
    else ranges.push(`${min} - ${max}`); // v1 - v2
  }
  const simplified = ranges.join(' || ');
  const original = typeof range.raw === 'string' ? range.raw : String(range);
  // 比较范围序列长度，返回短的
  return simplified.length < original.length ? simplified : range;
};
