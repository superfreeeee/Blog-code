'use strict';

/**
 * 最后修改时间格式化
 * @param {*} stat 
 * @returns 
 */
// ? Read
module.exports = function lastModifiedToString(stat) {
  // 单位上补 0
  const t = new Date(stat.mtime);
  return (('0' + (t.getDate())).slice(-2) + '-' +
          t.toLocaleString('default', { month: 'short' }) + '-' +
          t.getFullYear() + ' ' +
          ('0' + t.getHours()).slice(-2) + ':' +
          ('0' + t.getMinutes()).slice(-2));
};
