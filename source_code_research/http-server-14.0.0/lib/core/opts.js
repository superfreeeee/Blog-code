'use strict';

// This is so you can have options aliasing and defaults in one place.

const defaults = require('./defaults.json');
const aliases = require('./aliases.json');

/**
 * 配置参数解析
 * @param {*} opts 
 * @returns 
 */
module.exports = (opts) => {
  let autoIndex = defaults.autoIndex;
  let showDir = defaults.showDir; // ............. 打印资源目录
  let showDotfiles = defaults.showDotfiles;
  let humanReadable = defaults.humanReadable;
  let hidePermissions = defaults.hidePermissions;
  let si = defaults.si;
  let cache = defaults.cache;
  let gzip = defaults.gzip;
  let brotli = defaults.brotli;
  let defaultExt = defaults.defaultExt;
  let handleError = defaults.handleError;
  const headers = {};
  let contentType = defaults.contentType;
  let mimeTypes;
  let weakEtags = defaults.weakEtags;
  let weakCompare = defaults.weakCompare;
  let handleOptionsMethod = defaults.handleOptionsMethod;

  // 检查 opts 是否包含 k 属性
  function isDeclared(k) {
    return typeof opts[k] !== 'undefined' && opts[k] !== null;
  }

  // 将 headers[str] 设为 ture
  // or str="A:B"  => headers[A] = B
  function setHeader(str) {
    const m = /^(.+?)\s*:\s*(.*)$/.exec(str);
    if (!m) {
      headers[str] = true;
    } else {
      headers[m[1]] = m[2];
    }
  }

  // 配置参数解析
  if (opts) {
    // =============== >>> alias <<< ===============
    // autoIndex
    aliases.autoIndex.some((k) => {
      if (isDeclared(k)) {
        autoIndex = opts[k];
        return true;
      }
      return false;
    });

    // showDir
    aliases.showDir.some((k) => {
      if (isDeclared(k)) {
        showDir = opts[k];
        return true;
      }
      return false;
    });

    aliases.showDotfiles.some((k) => {
      if (isDeclared(k)) {
        showDotfiles = opts[k];
        return true;
      }
      return false;
    });

    aliases.humanReadable.some((k) => {
      if (isDeclared(k)) {
        humanReadable = opts[k];
        return true;
      }
      return false;
    });

    aliases.hidePermissions.some((k) => {
      if (isDeclared(k)) {
        hidePermissions = opts[k];
        return true;
      }
      return false;
    });

    aliases.si.some((k) => {
      if (isDeclared(k)) {
        si = opts[k];
        return true;
      }
      return false;
    });

    // =============== ^^^ alias ^^^ ===============
    // defaultExt
    if (opts.defaultExt && typeof opts.defaultExt === 'string') {
      defaultExt = opts.defaultExt;
    }

    // caches
    if (typeof opts.cache !== 'undefined' && opts.cache !== null) {
      if (typeof opts.cache === 'string') {
        // 字符串形式
        cache = opts.cache;
      } else if (typeof opts.cache === 'number') {
        // 数字 => max-age=<number>
        cache = `max-age=${opts.cache}`;
      } else if (typeof opts.cache === 'function') {
        // 函数形式
        cache = opts.cache;
      }
    }

    if (typeof opts.gzip !== 'undefined' && opts.gzip !== null) {
      gzip = opts.gzip;
    }

    if (typeof opts.brotli !== 'undefined' && opts.brotli !== null) {
      brotli = opts.brotli;
    }

    // =============== >>> alias <<< ===============
    aliases.handleError.some((k) => {
      if (isDeclared(k)) {
        handleError = opts[k];
        return true;
      }
      return false;
    });

    aliases.cors.forEach((k) => {
      if (isDeclared(k) && opts[k]) {
        handleOptionsMethod = true;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since';
      }
    });

    aliases.headers.forEach((k) => {
      if (isDeclared(k)) {
        if (Array.isArray(opts[k])) {
          opts[k].forEach(setHeader);
        } else if (opts[k] && typeof opts[k] === 'object') {
          Object.keys(opts[k]).forEach((key) => {
            headers[key] = opts[k][key];
          });
        } else {
          setHeader(opts[k]);
        }
      }
    });

    aliases.contentType.some((k) => {
      if (isDeclared(k)) {
        contentType = opts[k];
        return true;
      }
      return false;
    });

    aliases.mimeType.some((k) => {
      if (isDeclared(k)) {
        mimeTypes = opts[k];
        return true;
      }
      return false;
    });

    aliases.weakEtags.some((k) => {
      if (isDeclared(k)) {
        weakEtags = opts[k];
        return true;
      }
      return false;
    });

    aliases.weakCompare.some((k) => {
      if (isDeclared(k)) {
        weakCompare = opts[k];
        return true;
      }
      return false;
    });

    aliases.handleOptionsMethod.some((k) => {
      if (isDeclared(k)) {
        handleOptionsMethod = handleOptionsMethod || opts[k];
        return true;
      }
      return false;
    });
    // =============== ^^^ alias ^^^ ===============
  }

  // 重新导出
  return {
    cache,
    autoIndex,
    showDir,
    showDotfiles,
    humanReadable,
    hidePermissions,
    si,
    defaultExt,
    baseDir: (opts && opts.baseDir) || '/',
    gzip,
    brotli,
    handleError,
    headers,
    contentType,
    mimeTypes,
    weakEtags,
    weakCompare,
    handleOptionsMethod,
  };
};
