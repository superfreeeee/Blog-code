'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 对目录下文件进行排序
 * @param {*} dir 
 * @param {*} paths 
 * @param {*} cb 
 * @returns 
 */
// ? Read
module.exports = function sortByIsDirectory(dir, paths, cb) {
  // take the listing file names in `dir`
  // returns directory and file array, each entry is
  // of the array a [name, stat] tuple
  let pending = paths.length; // paths  => 文件路径
  // 返回结果
  const errs = [];
  const dirs = [];
  const files = [];

  if (!pending) {
    // 没有文件
    cb(errs, dirs, files);
    return;
  }

  paths.forEach((file) => {
    fs.stat(path.join(dir, file), (err, s) => {
      if (err) {
        // 读文件异常  => errs
        errs.push([file, err]);
      } else if (s.isDirectory()) {
        // 目录  => dirs
        dirs.push([file, s]);
      } else {
        // 一般文件  => files
        files.push([file, s]);
      }

      pending -= 1;
      if (pending === 0) {
        // 读完所有文件  => (errs, dirs, files)
        cb(errs, dirs, files);
      }
    });
  });
};
