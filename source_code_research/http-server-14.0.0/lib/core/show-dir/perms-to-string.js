'use strict';

/**
 * 打印文件可访问性
 * @param {*} stat 
 * @returns 
 */
// ? Read
module.exports = function permsToString(stat) {
  if (!stat.isDirectory || !stat.mode) {
    return '???!!!???';
  }

  const dir = stat.isDirectory() ? 'd' : '-';
  const mode = stat.mode.toString(8);

  // 输出权限字符串
  return dir + mode.slice(-3).split('').map(n => [
    '---', // 0 = 000
    '--x', // 1 = 001
    '-w-', // 2 = 010
    '-wx', // 3 = 011
    'r--', // 4 = 100
    'r-x', // 5 = 101
    'rw-', // 6 = 110
    'rwx', // 7 = 111
  ][parseInt(n, 10)]).join('');
};
