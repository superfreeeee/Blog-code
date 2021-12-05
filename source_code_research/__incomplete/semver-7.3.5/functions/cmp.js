const eq = require('./eq');
const neq = require('./neq');
const gt = require('./gt');
const gte = require('./gte');
const lt = require('./lt');
const lte = require('./lte');

/**
 * compare 通用版本
 * @param {*} a
 * @param {*} op
 * @param {*} b
 * @param {*} loose
 * @returns
 */
// ? Read
const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      // SemVer 对象时比较 version 字符串
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a === b;

    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a !== b;

    case '':
    case '=':
    case '==':
      // a = b ?
      return eq(a, b, loose);

    case '!=':
      return neq(a, b, loose);

    case '>':
      return gt(a, b, loose);

    case '>=':
      return gte(a, b, loose);

    case '<':
      return lt(a, b, loose);

    case '<=':
      return lte(a, b, loose);

    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
module.exports = cmp;
