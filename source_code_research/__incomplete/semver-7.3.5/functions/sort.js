const compareBuild = require('./compare-build');
/**
 * 排序（升序）
 * @param {*} list
 * @param {*} loose
 * @returns
 */
// ? Read
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
module.exports = sort;
