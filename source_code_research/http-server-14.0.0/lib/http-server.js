'use strict';

var fs = require('fs'),
  union = require('union'),
  httpServerCore = require('./core'),
  auth = require('basic-auth'),
  httpProxy = require('http-proxy'),
  corser = require('corser'),
  secureCompare = require('secure-compare');

/**
 * 暴露 HttpServer 主类
 */
// ? Read
//
// Remark: backwards compatibility for previous
// case convention of HTTP
//
exports.HttpServer = exports.HTTPServer = HttpServer;

/**
 * 暴露 createServer 接口
 * Returns a new instance of HttpServer with the
 * specified `options`.
 */
// ? Read
exports.createServer = function (options) {
  // 返回 HttpServer 实例
  return new HttpServer(options);
};

/**
 * Http 服务器主类
 * Constructor function for the HttpServer object
 * which is responsible for serving static files along
 * with other HTTP-related features.
 */
// ? Read
function HttpServer(options) {
  options = options || {};

  // 静态资源根目录
  if (options.root) {
    this.root = options.root;
  } else {
    // 默认采用 public 做静态资源目录
    try {
      // eslint-disable-next-line no-sync
      fs.lstatSync('./public');
      this.root = './public';
    } catch (err) {
      // 第二序位为当前目录
      this.root = './';
    }
  }

  this.headers = options.headers || {}; // 默认 headers
  this.headers['Accept-Ranges'] = 'bytes';

  // 缓存资源大小
  this.cache =
    // eslint-disable-next-line no-nested-ternary
    options.cache === undefined
      ? 3600
      : // -1 is a special case to turn off caching.
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#Preventing_caching
      options.cache === -1
      ? 'no-cache, no-store, must-revalidate'
      : options.cache; // in seconds.
  this.showDir = options.showDir !== 'false';
  this.autoIndex = options.autoIndex !== 'false';
  this.showDotfiles = options.showDotfiles;
  this.gzip = options.gzip === true;
  this.brotli = options.brotli === true;
  if (options.ext) {
    this.ext = options.ext === true ? 'html' : options.ext;
  }
  this.contentType =
    options.contentType || this.ext === 'html'
      ? 'text/html'
      : 'application/octet-stream';

  // =============== 参数校验 ===============

  var before = options.before ? options.before.slice() : [];

  // logger 中间件
  if (options.logFn) {
    before.push(function (req, res) {
      options.logFn(req, res);
      res.emit('next');
    });
  }

  // 权限验证中间件
  if (options.username || options.password) {
    before.push(function (req, res) {
      var credentials = auth(req);

      // We perform these outside the if to avoid short-circuiting and giving
      // an attacker knowledge of whether the username is correct via a timing
      // attack.
      if (credentials) {
        // if credentials is defined, name and pass are guaranteed to be string
        // type
        // 检查账号密码
        var usernameEqual = secureCompare(
          options.username.toString(),
          credentials.name
        );
        var passwordEqual = secureCompare(
          options.password.toString(),
          credentials.pass
        );
        if (usernameEqual && passwordEqual) {
          // 判断通过才触发 next 事件
          return res.emit('next');
        }
      }

      // 401 权限问题
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm=""');
      res.end('Access denied');
    });
  }

  // 跨域中间件
  if (options.cors) {
    // 跨域相关 Http 请求头
    //   Access-Control-Allow-Origin
    //   Access-Control-Allow-Headers
    this.headers['Access-Control-Allow-Origin'] = '*';
    this.headers['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept, Range';
    if (options.corsHeaders) {
      options.corsHeaders.split(/\s*,\s*/).forEach(function (h) {
        this.headers['Access-Control-Allow-Headers'] += ', ' + h;
      }, this);
    }
    // 跨域中间件
    before.push(
      corser.create(
        options.corsHeaders
          ? {
              requestHeaders:
                this.headers['Access-Control-Allow-Headers'].split(/\s*,\s*/),
            }
          : null
      )
    );
  }

  // robots.txt 中间件
  if (options.robots) {
    before.push(function (req, res) {
      if (req.url === '/robots.txt') {
        // 查询 robots.txt 文件
        res.setHeader('Content-Type', 'text/plain');
        var robots =
          options.robots === true
            ? 'User-agent: *\nDisallow: /'
            : options.robots.replace(/\\n/, '\n');

        return res.end(robots);
      }

      res.emit('next');
    });
  }

  // 核心 http 模块作为中间件插入
  before.push(
    httpServerCore({
      root: this.root,
      cache: this.cache,
      showDir: this.showDir,
      showDotfiles: this.showDotfiles,
      autoIndex: this.autoIndex,
      defaultExt: this.ext,
      gzip: this.gzip,
      brotli: this.brotli,
      contentType: this.contentType,
      mimetypes: options.mimetypes,
      handleError: typeof options.proxy !== 'string',
    })
  );

  // http proxy 代理服务器中间件
  if (typeof options.proxy === 'string') {
    var proxyOptions = options.proxyOptions || {};
    var proxy = httpProxy.createProxyServer(proxyOptions);
    // 插入 proxy server
    before.push(function (req, res) {
      proxy.web(
        req,
        res,
        {
          target: options.proxy,
          changeOrigin: true,
        },
        function (err, req, res) {
          if (options.logFn) {
            options.logFn(req, res, {
              message: err.message,
              status: res.statusCode,
            });
          }
          res.emit('next');
        }
      );
    });
  }

  // 服务器配置参数
  var serverOptions = {
    before: before,
    headers: this.headers,
    onError: function (err, req, res) {
      if (options.logFn) {
        options.logFn(req, res, err);
      }

      res.end();
    },
  };

  if (options.https) {
    serverOptions.https = options.https;
  }

  // 具体创建服务器
  this.server =
    serverOptions.https && serverOptions.https.passphrase
      ? // if passphrase is set, shim must be used as union does not support
        require('./shims/https-server-shim')(serverOptions) // https 服务
      : union.createServer(serverOptions); // http 服务（基于 union 创建）

  // 设置 timeout
  if (options.timeout !== undefined) {
    this.server.setTimeout(options.timeout);
  }
}

/**
 * server.listen 方法
 * @returns arguments
 */
// ? Read
HttpServer.prototype.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

/**
 * server.close 方法
 */
// ? Read
HttpServer.prototype.close = function () {
  return this.server.close();
};
