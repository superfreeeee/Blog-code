'use strict';

/**
 * 构建 Etag 字段
 * @param {*} stat
 * @param {*} weakEtag
 * @returns
 */
module.exports = (stat, weakEtag) => {
  // "<ino>-<size>-<mtime>"
  let etag = `"${[stat.ino, stat.size, stat.mtime.toISOString()].join('-')}"`;
  if (weakEtag) {
    // W/"<ino>-<size>-<mtime>"
    etag = `W/${etag}`;
  }
  return etag;
};
