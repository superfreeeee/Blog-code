const compareBuild = require('./compare-build');
/**
 * 排序（降序）
 * @param {*} list
 * @param {*} loose
 * @returns
 */
// ? Read
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
module.exports = rsort;
