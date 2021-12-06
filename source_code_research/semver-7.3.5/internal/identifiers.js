// ? 数字标识符
const numeric = /^[0-9]+$/;

/**
 * 比较数字标识符
 * @param {*} a
 * @param {*} b
 * @returns
 */
// ? Read
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  // 优先级：标识符 > 数字
  // a = b  =>  0
  // a < b  =>  -1
  // a > b  =>  1
  // return sign(a - b)
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};

// ? 反向比较数字标识符
const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
};
