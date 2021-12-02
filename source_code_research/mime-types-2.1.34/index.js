/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var db = require('mime-db');
var extname = require('path').extname;

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var TEXT_TYPE_REGEXP = /^text\//i;

/**
 * Module exports.
 * @public
 */

exports.charset = charset;
exports.charsets = { lookup: charset };
exports.contentType = contentType;
exports.extension = extension;
exports.extensions = Object.create(null); // type => ext[]
exports.lookup = lookup;
exports.types = Object.create(null); // ext => type

// 初始化 extensions/types
// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types);

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */
// ? Read
function charset(type) {
  if (!type || typeof type !== 'string') {
    return false;
  }

  // ========== 以上为类型检查 ==========

  // 抽取 mime 类型
  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type);
  var mime = match && db[match[1].toLowerCase()];

  if (mime && mime.charset) {
    // db.json 导出属性优先
    return mime.charset;
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    // text/* 的默认 UTF-8
    return 'UTF-8';
  }

  // 其他默认没有 charset
  return false;
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */
// ? Read
function contentType(str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false;
  }

  // ========== 以上为类型检查 ==========

  // 有 /   => MIME 类型
  // 没有 / => 一般文件路径
  var mime = str.indexOf('/') === -1 ? exports.lookup(str) : str;

  if (!mime) {
    return false;
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    // 补上 charset
    var charset = exports.charset(mime);
    if (charset) mime += '; charset=' + charset.toLowerCase();
  }

  return mime;
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */
// ? Read
function extension(type) {
  if (!type || typeof type !== 'string') {
    return false;
  }

  // ========== 以上为类型检查 ==========

  // TODO: use media-typer
  // 从输入 type 抽取 MIME 类型
  var match = EXTRACT_TYPE_REGEXP.exec(type);

  // get extensions
  // 从 extensions 获取 exts
  var exts = match && exports.extensions[match[1].toLowerCase()];

  if (!exts || !exts.length) {
    return false;
  }

  // 返回第一种扩展名
  return exts[0];
}

/**
 * Lookup the MIME type for a file path/extension.
 * 获取给定目标文件的 MIME 类型
 *
 * @param {string} path
 * @return {boolean|string}
 */
// ? Read
function lookup(path) {
  if (!path || typeof path !== 'string') {
    return false;
  }

  // ========== 以上为类型检查 ==========

  // get the extension ("ext" or ".ext" or full path)
  // 获取 ext 的部分
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1);

  if (!extension) {
    return false;
  }

  return exports.types[extension] || false;
}

/**
 * Populate the extensions and types maps.
 * 初始化 extensions 与 types
 * @private
 */
// ? Read
function populateMaps(extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana'];

  Object.keys(db).forEach(function forEachMimeType(type) {
    var mime = db[type];
    var exts = mime.extensions;

    // 1. exts 为空
    if (!exts || !exts.length) {
      return;
    }

    // mime -> extensions
    extensions[type] = exts;

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i];

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source);
        var to = preference.indexOf(mime.source);

        if (
          types[extension] !== 'application/octet-stream' &&
          (from > to ||
            (from === to && types[extension].substr(0, 12) === 'application/'))
        ) {
          // skip the remapping
          continue;
        }
      }

      // set the extension -> mime
      types[extension] = type;
    }
  });
}
