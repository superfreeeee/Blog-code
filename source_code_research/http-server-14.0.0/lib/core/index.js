#! /usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const { Readable } = require('stream');
const buffer = require('buffer');
const mime = require('mime');
const urlJoin = require('url-join');
const showDir = require('./show-dir');
const version = require('../../package.json').version; // 系统版本号
const status = require('./status-handlers');
const generateEtag = require('./etag');
const optsParser = require('./opts');
const htmlEncodingSniffer = require('html-encoding-sniffer');

let httpServerCore = null;

/**
 * 解码  parsedUrl.pathname 部分
 * @param {*} pathname 
 * @returns 
 */
// ? Read
function decodePathname(pathname) {
  // 按 / 划分，\ 转换为 /
  const pieces = pathname.replace(/\\/g, '/').split('/');

  const normalized = path.normalize(pieces.map((rawPiece) => {
    // 分段转换 piece
    const piece = decodeURIComponent(rawPiece);

    // win 32 不接受路径包含 \
    if (process.platform === 'win32' && /\\/.test(piece)) {
      throw new Error('Invalid forward slash character');
    }

    return piece;
  }).join('/'));
  return process.platform === 'win32'
    ? normalized.replace(/\\/g, '/') : normalized;
}

const nonUrlSafeCharsRgx = /[\x00-\x1F\x20\x7F-\uFFFF]+/g;
function ensureUriEncoded(text) {
  return text
  return String(text).replace(nonUrlSafeCharsRgx, encodeURIComponent);
}

/**
 * 检查 headrs[accept-encoding] 是否包含 * compress gzip deflate
 *   尝试压缩文件
 * @param {*} req 
 * @returns 
 */
// ? Read
// Check to see if we should try to compress a file with gzip.
function shouldCompressGzip(req) {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
    .split(',')
    .some(el => ['*', 'compress', 'gzip', 'deflate'].indexOf(el.trim()) !== -1)
  ;
}

/**
 * 检查 header[accept-encoding] 是否包含 * 或 br
 *   尝试 brotli 压缩
 * @param {*} req 
 * @returns 
 */
// ? Read
function shouldCompressBrotli(req) {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
    .split(',')
    .some(el => ['*', 'br'].indexOf(el.trim()) !== -1)
  ;
}

/**
 * 检查 gzip 文件二进制标识
 * @param {*} gzipped 
 * @param {*} cb 
 */
// ? Read
function hasGzipId12(gzipped, cb) {
  const stream = fs.createReadStream(gzipped, { start: 0, end: 1 });
  let buffer = Buffer.from('');
  let hasBeenCalled = false;

  stream.on('data', (chunk) => {
    // 取前两个字符
    buffer = Buffer.concat([buffer, chunk], 2);
  });

  // 读异常
  stream.on('error', (err) => {
    if (hasBeenCalled) {
      throw err;
    }

    hasBeenCalled = true;
    cb(err);
  });

  // 流关闭
  stream.on('close', () => {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;
    cb(null, buffer[0] === 31 && buffer[1] === 139); // 31 139 = 0x1f 0x8B 表示 gzip 文件
  });
}

/**
 * httpServerCore 中间件构造函数
 * @param {*} _dir 
 * @param {*} _options 
 * @returns 
 */
// ? Read
module.exports = function createMiddleware(_dir, _options) {
  let dir;
  let options;
  // 设置资源根目录 & 配置参数
  if (typeof _dir === 'string') {
    // (dir, options)
    dir = _dir;
    options = _options;
  } else {
    // (options)
    options = _dir;
    dir = options.root;
  }

  const root = path.join(path.resolve(dir), '/');
  const opts = optsParser(options); // 解析配置参数
  // 配置参数展开
  const cache = opts.cache;
  const autoIndex = opts.autoIndex;
  const baseDir = opts.baseDir;
  let defaultExt = opts.defaultExt;
  const handleError = opts.handleError;
  const headers = opts.headers;
  const weakEtags = opts.weakEtags;
  const handleOptionsMethod = opts.handleOptionsMethod;
  
  // ============ ^^^ 配置参数抽取 ^^^ ============

  opts.root = dir; // root 又回来啦
  if (defaultExt && /^\./.test(defaultExt)) {
    defaultExt = defaultExt.replace(/^\./, '');
  }

  // Support hashes and .types files in mimeTypes @since 0.8
  if (opts.mimeTypes) {
    try {
      // You can pass a JSON blob here---useful for CLI use
      opts.mimeTypes = JSON.parse(opts.mimeTypes);
    } catch (e) {
      // swallow parse errors, treat this as a string mimetype input
    }
    if (typeof opts.mimeTypes === 'string') {
      mime.load(opts.mimeTypes);
    } else if (typeof opts.mimeTypes === 'object') {
      mime.define(opts.mimeTypes);
    }
  }

  // ============ ^^^ 配置参数校验 ^^^ ============

  /**
   * 检查是否应该返回 304
   *   检查 if-modified-since、if-none-match 请求头
   * @param {*} req 
   * @param {*} serverLastModified 
   * @param {*} serverEtag 
   * @returns 
   */
  // ? Read
  function shouldReturn304(req, serverLastModified, serverEtag) {
    // req、req.readers 为空
    if (!req || !req.headers) {
      return false;
    }

    const clientModifiedSince = req.headers['if-modified-since'];
    const clientEtag = req.headers['if-none-match'];
    let clientModifiedDate;

    if (!clientModifiedSince && !clientEtag) {
      // Client did not provide any conditional caching headers
      // 客户端未提供 headers[if-modified-since] | headers[if-none-match]
      return false;
    }

    if (clientModifiedSince) {
      // Catch "illegal access" dates that will crash v8
      // 需提供合法 Date
      try {
        clientModifiedDate = new Date(Date.parse(clientModifiedSince));
      } catch (err) {
        return false;
      }

      if (clientModifiedDate.toString() === 'Invalid Date') {
        return false;
      }
      // If the client's copy is older than the server's, don't return 304
      if (clientModifiedDate < new Date(serverLastModified)) {
        return false;
      }
    }

    if (clientEtag) {
      // Do a strong or weak etag comparison based on setting
      // https://www.ietf.org/rfc/rfc2616.txt Section 13.3.3
      // 比较 W/etag
      if (opts.weakCompare && clientEtag !== serverEtag
          && clientEtag !== `W/${serverEtag}` && `W/${clientEtag}` !== serverEtag) {
        return false;
      }
      // 比较 etag
      if (!opts.weakCompare && (clientEtag !== serverEtag || clientEtag.indexOf('W/') === 0)) {
        return false;
      }
    }

    return true;
  }

  // ? Read
  // 核心中间件
  return function middleware(req, res, next) {
    // 解析 url
    // Figure out the path for the file from the given url
    const parsed = url.parse(req.url);
    let pathname = null;
    let file = null;
    let gzippedFile = null;
    let brotliFile = null;

    try {
      // 校验 url 字符
      decodeURIComponent(req.url); // check validity of url
      pathname = decodePathname(parsed.pathname);
    } catch (err) {
      // 400 bad request
      status[400](res, next, { error: err });
      return;
    }

    // 文件路径：root / baseDir pathname
    file = path.normalize(
      path.join(
        root,
        path.relative(path.join('/', baseDir), pathname)
      )
    );
    // determine compressed forms if they were to exist
    gzippedFile = `${file}.gz`;
    brotliFile = `${file}.br`;

    // 填上默认 headers
    Object.keys(headers).forEach((key) => {
      res.setHeader(key, headers[key]);
    });

    // OPTIONS 请求直接返回（直接成功）
    if (req.method === 'OPTIONS' && handleOptionsMethod) {
      res.end();
      return;
    }

    // TODO: This check is broken, which causes the 403 on the
    // expected 404.
    // 确保 file 路径正确（404 才对）
    if (file.slice(0, root.length) !== root) {
      status[403](res, next);
      return;
    }

    // 静态资源只支持 GET 和 HEAD 方法
    if (req.method && (req.method !== 'GET' && req.method !== 'HEAD')) {
      status[405](res, next);
      return;
    }

    /**
     * 提供文件（stat）
     * @param {*} stat 
     * @returns 
     */
    // ? Read
    function serve(stat) {
      // Do a MIME lookup, fall back to octet-stream and handle gzip
      // and brotli special case.
      const defaultType = opts.contentType || 'application/octet-stream';
      let contentType = mime.lookup(file, defaultType); // mime 类型
      const range = (req.headers && req.headers.range); // headers[range]
      const lastModified = (new Date(stat.mtime)).toUTCString(); // 最后修改时间 stat.mtime
      const etag = generateEtag(stat, weakEtags); // 构建 etag
      let cacheControl = cache;
      let stream = null; // 创建可读流
      // text/xxx 类型
      if (contentType && isTextFile(contentType)) {
        if (stat.size < buffer.constants.MAX_LENGTH) {
          // 文件小于一个 stream 的大小
          const bytes = fs.readFileSync(file);
          const sniffedEncoding = htmlEncodingSniffer(bytes, {
            defaultEncoding: 'UTF-8'
          });
          contentType += `; charset=${sniffedEncoding}`;
          stream = Readable.from(bytes)
        } else {
          // Assume text types are utf8
          contentType += '; charset=UTF-8';
        }
      }

      // 压缩类型文件  => 修改 headers[Content-Encoding] & contentType
      if (file === gzippedFile) { // is .gz picked up
        // 1. 选中 gzip 文件
        res.setHeader('Content-Encoding', 'gzip');
        // strip gz ending and lookup mime type
        contentType = mime.lookup(path.basename(file, '.gz'), defaultType);
      } else if (file === brotliFile) { // is .br picked up
        // 2. 选中 brotli 文件
        res.setHeader('Content-Encoding', 'br');
        // strip br ending and lookup mime type
        contentType = mime.lookup(path.basename(file, '.br'), defaultType);
      }

      // headers[cacheControl] 
      if (typeof cacheControl === 'function') {
        cacheControl = cache(pathname);
      }
      if (typeof cacheControl === 'number') {
        cacheControl = `max-age=${cacheControl}`;
      }

      if (range) {
        const total = stat.size;
        const parts = range.trim().replace(/bytes=/, '').split('-');
        const partialstart = parts[0];
        const partialend = parts[1];
        const start = parseInt(partialstart, 10);
        const end = Math.min(
          total - 1,
          partialend ? parseInt(partialend, 10) : total - 1
        );
        const chunksize = (end - start) + 1;
        let fstream = null;

        if (start > end || isNaN(start) || isNaN(end)) {
          status['416'](res, next);
          return;
        }

        fstream = fs.createReadStream(file, { start, end });
        fstream.on('error', (err) => {
          status['500'](res, next, { error: err });
        });
        res.on('close', () => {
          fstream.destroy();
        });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'cache-control': cacheControl,
          'last-modified': lastModified,
          etag,
        });
        fstream.pipe(res);
        return;
      }

      // 设置 headers
      // TODO: Helper for this, with default headers.
      res.setHeader('cache-control', cacheControl);
      res.setHeader('last-modified', lastModified);
      res.setHeader('etag', etag);

      // Return a 304 if necessary
      // 检查 req 可返回 304
      if (shouldReturn304(req, lastModified, etag)) {
        status[304](res, next);
        return;
      }

      // 设置 headers
      res.setHeader('content-length', stat.size);
      res.setHeader('content-type', contentType);

      // set the response statusCode if we have a request statusCode.
      // This only can happen if we have a 404 with some kind of 404.html
      // In all other cases where we have a file we serve the 200
      res.statusCode = req.statusCode || 200;

      // HEAD 方法只需要返回 headers 即可
      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      // stream may already have been assigned during encoding sniffing.
      if (stream === null) {
        // 创建读文件流
        stream = fs.createReadStream(file);
      }

      // 文件数据写入 res 流
      stream.pipe(res);
      stream.on('error', (err) => {
        // 流异常  => 500
        status['500'](res, next, { error: err });
      });
      stream.on('close', () => {
        // 销毁 readable stream
        stream.destroy();
      })
    }

    /**
     * 查找一般文件  => 返回 stat（调用 serve(stat)）
     */
    // ? Read
    function statFile() {
      try {
        fs.stat(file, (err, stat) => {
          // 读目标文件
          if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
            // 1. ENOENT ENOTDIR 异常
            if (req.statusCode === 404) {
              // 1.1 404.html 不存在  => 返回简单 404 文字版
              // This means we're already trying ./404.html and can not find it.
              // So send plain text response with 404 status code
              status[404](res, next);
            } else if (!path.extname(parsed.pathname).length && defaultExt) {
              // 1.2 查找目标没有后缀  => 加上后缀后重试
              // If there is no file extension in the path and we have a default
              // extension try filename and default extension combination before rendering 404.html.
              // req { url, headers }
              middleware({
                url: `${parsed.pathname}.${defaultExt}${(parsed.search) ? parsed.search : ''}`,
                headers: req.headers,
              }, res, next);
            } else {
              // 1.3 尝试 404.html
              // Try to serve default ./404.html
              const rawUrl = (handleError ? `/${path.join(baseDir, `404.${defaultExt}`)}` : req.url);
              const encodedUrl = ensureUriEncoded(rawUrl);
              middleware({
                url: encodedUrl,
                headers: req.headers,
                statusCode: 404,
              }, res, next);
            }
          } else if (err) {
            // 2. 其他异常  => 状态码 500
            status[500](res, next, { error: err });
          } else if (stat.isDirectory()) {
            // 3. 查找目标为目录
            if (!autoIndex && !opts.showDir) {
              // 状态码 404
              status[404](res, next);
              return;
            }


            // 302 to / if necessary
            // 根目录则返回 302
            if (!pathname.match(/\/$/)) {
              res.statusCode = 302;
              const q = parsed.query ? `?${parsed.query}` : '';
              res.setHeader(
                'location',
                ensureUriEncoded(`${parsed.pathname}/${q}`)
              );
              res.end();
              return;
            }

            // 自动查找 index.<ext> 文件，默认查找 index.html
            if (autoIndex) {
              middleware({
                url: urlJoin(
                  encodeURIComponent(pathname),
                  `/index.${defaultExt}`
                ),
                headers: req.headers,
              }, res, (autoIndexError) => {
                if (autoIndexError) {
                  // 还是失败哈  => 500 吧
                  status[500](res, next, { error: autoIndexError });
                  return;
                }
                if (opts.showDir) {
                  // 允许查找目录 => 返回目录页面
                  showDir(opts, stat)(req, res);
                  return;
                }

                // index.html 查找未返回的话，补充 403 返回
                status[403](res, next);
              });
              return;
            }

            // autoIndex = false  => 返回目录页
            if (opts.showDir) {
              showDir(opts, stat)(req, res);
            }
          } else {
            // 4. 查找文件，使用 serve(stat)
            serve(stat);
          }
        });
      } catch (err) {
        // 读 stat 异常
        status[500](res, next, { error: err.message });
      }
    }

    // ? Read
    // 检查目标 mimeType 是否为 text 类型
    // text/application, text/javascirpt, text/json
    function isTextFile(mimeType) {
      return (/^text\/|^application\/(javascript|json)/).test(mimeType);
    }

    // ? Read
    // serve gzip file if exists and is valid
    function tryServeWithGzip() {
      try {
        fs.stat(gzippedFile, (err, stat) => {
          // 查找 gzip 压缩文件
          if (!err && stat.isFile()) {
            hasGzipId12(gzippedFile, (gzipErr, isGzip) => {
              // 检查 gzip 文件二进制流
              if (!gzipErr && isGzip) {
                file = gzippedFile;
                // 提供文件
                serve(stat);
              } else {
                // 重新查找文件
                statFile();
              }
            });
          } else {
            // 重新查找文件
            statFile();
          }
        });
      } catch (err) {
        // gzip 文件读 stat 异常（已经检查过是否存在）
        status[500](res, next, { error: err.message });
      }
    }

    // ? Read
    // 1. 尝试 brotli 压缩文件
    // 2. 尝试 gzip 压缩文件
    // 3. 查找一般文件
    // serve brotli file if exists, otherwise try gzip
    function tryServeWithBrotli(shouldTryGzip) {
      try {
        fs.stat(brotliFile, (err, stat) => {
          // 检查目标文件是否存在
          if (!err && stat.isFile()) {
            // 1. 目标文件存在
            file = brotliFile;
            serve(stat);
          } else if (shouldTryGzip) {
            // 2. br 失败则再尝试 gzip
            tryServeWithGzip();
          } else {
            // 3. 最后返回直接文件查找
            statFile();
          }
        });
      } catch (err) {
        status[500](res, next, { error: err.message });
      }
    }

    const shouldTryBrotli = opts.brotli && shouldCompressBrotli(req);
    const shouldTryGzip = opts.gzip && shouldCompressGzip(req);
    // always try brotli first, next try gzip, finally serve without compression
    // 查找顺序：brotli 压缩文件 > gzip 压缩文件 > 一般文件查找
    if (shouldTryBrotli) {
      tryServeWithBrotli(shouldTryGzip);
    } else if (shouldTryGzip) {
      tryServeWithGzip();
    } else {
      statFile();
    }
  };
};


httpServerCore = module.exports;
httpServerCore.version = version; // version 属性
httpServerCore.showDir = showDir; // showDir 属性
