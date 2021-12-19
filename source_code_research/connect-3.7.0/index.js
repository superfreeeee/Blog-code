/*!
 * connect
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var debug = require('debug')('connect:dispatcher');
var EventEmitter = require('events').EventEmitter;
var finalhandler = require('finalhandler');
var http = require('http');
var merge = require('utils-merge');
var parseUrl = require('parseurl');

/**
 * Module exports.
 * @public
 */

module.exports = createServer;

/**
 * Module variables.
 * @private
 */

var env = process.env.NODE_ENV || 'development'; // 默认开启 development 模式
var proto = {};

/**
 * 简单异步(nextTick)
 * 优先级：
 *   1. setImmediate
 *   2. nextTick
 */
// ? Read
/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }

/**
 * 创建一个带中间件 server
 * 
 * Create a new connect server.
 *
 * @return {function}
 * @public
 */
// ? Read
function createServer() {
  // 默认传入初始 app 函数
  function app(req, res, next){ app.handle(req, res, next); }
  merge(app, proto);                  // 混入 use、handle、listen 方法
  merge(app, EventEmitter.prototype); // 混入 EventEmitter 方法
  app.route = '/';
  app.stack = [];
  return app;
}

/**
 * 插入中间件
 * 
 * Utilize the given middleware `handle` to the given `route`,
 * defaulting to _/_. This "route" is the mount-point for the
 * middleware, when given a value other than _/_ the middleware
 * is only effective when that segment is present in the request's
 * pathname.
 *
 * For example if we were to mount a function at _/admin_, it would
 * be invoked on _/admin_, and _/admin/settings_, however it would
 * not be invoked for _/_, or _/posts_.
 *
 * @param {String|Function|Server} route, callback or server
 * @param {Function|Server} callback or server
 * @return {Server} for chaining
 * @public
 */
// ? Read
proto.use = function use(route, fn) {
  var path = route; // 配置路径
  var handle = fn; // 处理函数

  // default route to '/'
  if (typeof route !== 'string') {
    handle = route;
    path = '/'; // 默认路径为 /
  }

  // wrap sub-apps
  if (typeof handle.handle === 'function') {
    // handle 为 app 则 handle.handle 为函数
    var server = handle; // 这时候的 handle 是另一个 app
    server.route = path; // 使用 path 更新参数 app
    // 包装 server.handle 方法
    handle = function (req, res, next) {
      // 以 server 为上下文的中间件调用
      server.handle(req, res, next);
    };
  }

  // wrap vanilla http.Servers
  if (handle instanceof http.Server) {
    // handle 是另一个 httpServer，使用第一个监听函数取代
    handle = handle.listeners('request')[0];
  }

  // 忽略后缀 /
  // strip trailing slash
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }

  // add the middleware
  debug('use %s %s', path || '/', handle.name || 'anonymous');
  // 向栈中推入 { route, handle } 节点
  this.stack.push({ route: path, handle: handle });

  return this;
};

/**
 * 处理函数
 *   由第一层的 app 接受 request 事件后调用
 * Handle server requests, punting them down
 * the middleware stack.
 *
 * @private
 */
// ? Read
proto.handle = function handle(req, res, out) {
  var index = 0;
  var protohost = getProtohost(req.url) || '';
  var removed = '';
  var slashAdded = false;
  var stack = this.stack;

  // 创建终结回调函数
  // final function handler
  var done = out || finalhandler(req, res, {
    env: env,
    onerror: logerror
  });

  // store the original URL
  req.originalUrl = req.originalUrl || req.url;

  /**
   * 执行下一个中间件函数
   * @param {*} err 
   * @returns 
   */
  function next(err) {
    // 默认忽略第一个 /
    if (slashAdded) {
      req.url = req.url.substr(1);
      slashAdded = false;
    }

    // removed 部分回填
    if (removed.length !== 0) {
      req.url = protohost + removed + req.url.substr(protohost.length);
      removed = '';
    }

    // next callback
    var layer = stack[index++]; // 获取下一个中间件

    // all done
    if (!layer) {
      // 没有下一个则异步调用 done
      defer(done, err);
      return;
    }

    // route data
    var path = parseUrl(req).pathname || '/'; // 匹配 path 部分
    var route = layer.route;

    // skip this layer if the route doesn't match
    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      // path(当前 req) 与 route(当前中间件) 不匹配时进入下一个中间件
      return next(err);
    }

    // skip if route match does not border "/", ".", or end
    var c = path.length > route.length && path[route.length];
    if (c && c !== '/' && c !== '.') {
      // path 长度更长、且 path 越界部分不为空
      // => 进入下一个中间件
      return next(err);
    }

    // trim off the part of the url that matches the route
    // 非 / 的 route 进行处理
    if (route.length !== 0 && route !== '/') {
      removed = route;
      // url 只保留 protocol + host + route(= removed)
      req.url = protohost + req.url.substr(protohost.length + removed.length);

      // ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        // 确保以 / 开头
        req.url = '/' + req.url;
        slashAdded = true;
      }
    }

    // call the layer handle
    // 调用中间件
    call(layer.handle, route, err, req, res, next);
  }

  next();
};

/**
 * httpServer.listen 代理
 * 使用 http.createServer 启动一个 httpServer，以 app 做监听函数
 * Listen for connections.
 *
 * This method takes the same arguments
 * as node's `http.Server#listen()`.
 *
 * HTTP and HTTPS:
 *
 * If you run your application both as HTTP
 * and HTTPS you may wrap them individually,
 * since your Connect "server" is really just
 * a JavaScript `Function`.
 *
 *      var connect = require('connect')
 *        , http = require('http')
 *        , https = require('https');
 *
 *      var app = connect();
 *
 *      http.createServer(app).listen(80);
 *      https.createServer(options, app).listen(443);
 *
 * @return {http.Server}
 * @api public
 */
// ? Read
proto.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

/**
 * 触发中间件
 * Invoke a route handle.
 * @private
 */
// ? Read
function call(handle, route, err, req, res, next) {
  var arity = handle.length; // 处理函数类型（按参数长度判断）
  var error = err;
  var hasError = Boolean(err);

  debug('%s %s : %s', handle.name || '<anonymous>', route, req.originalUrl);

  // handle 调用之后直接结束
  // 由 handle 内部决定时候递归调用 next 进入下一个中间件
  try {
    if (hasError && arity === 4) {
      // 四参数处理函数 (err, req, res, next)
      // error-handling middleware
      handle(err, req, res, next);
      return;
    } else if (!hasError && arity < 4) {
      // 三参数处理函数 (req, res, next)
      // request-handling middleware
      handle(req, res, next);
      return;
    }
  } catch (e) {
    // replace the error
    // 以最新报错取代
    error = e;
  }

  // 出现异常才自动调用 next
  // continue
  next(error);
}

/**
 * console.error 异常输出 (console.error 包装)
 * Log error using console.error.
 *
 * @param {Error} err
 * @private
 */
// ? Read
function logerror(err) {
  if (env !== 'test') console.error(err.stack || err.toString());
}

/**
 * 获取 url 中 (协议 + 域) 的部分
 * <protocol>://<host>
 * Get get protocol + host for a URL.
 *
 * @param {string} url
 * @private
 */
// ? Read
function getProtohost(url) {
  if (url.length === 0 || url[0] === '/') {
    return undefined;
  }

  var fqdnIndex = url.indexOf('://')

  return fqdnIndex !== -1 && url.lastIndexOf('?', fqdnIndex) === -1 // lastIndexOf = fqdnIndex -> 0
    ? url.substr(0, url.indexOf('/', 3 + fqdnIndex)) // http://localhost:3000
    : undefined;
}
