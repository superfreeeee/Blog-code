/*
 * http-stream.js: Idomatic buffered stream which pipes additional HTTP information.
 *
 * (C) 2011, Charlie Robbins & the Contributors
 * MIT LICENSE
 *
 */

var url = require('url'),
    util = require('util'),
    qs = require('qs'),
    HttpStream = require('./http-stream');

/**
 * 请求流
 */
// ? Read
var RequestStream = module.exports = function (options) {
  options = options || {};
  HttpStream.call(this, options);

  // pipe 事件接上 pipeRequest
  this.on('pipe', this.pipeRequest);
  // 传递 request
  this.request = options.request;
};

// ? 继承 HttpStream
util.inherits(RequestStream, HttpStream);

//
// ### function pipeRequest (source)
// #### @source {ServerRequest|HttpStream} Source stream piping to this instance
// Pipes additional HTTP request metadata from the `source` HTTP stream (either concrete or
// abstract) to this instance. e.g. url, headers, query, etc.
//
// Remark: Is there anything else we wish to pipe?
//
// ? Read
RequestStream.prototype.pipeRequest = function (source) {
  // 传递参数
  this.url = this.originalUrl = source.url;        // 请求路径
  this.method = source.method;                     // 请求方法
  this.httpVersion = source.httpVersion;           // HTTP 版本号
  this.httpVersionMajor = source.httpVersionMajor; // HTTP 主版本号
  this.httpVersionMinor = source.httpVersionMinor; // HTTP 次版本号
  this.setEncoding = source.setEncoding;           // 编码函数
  this.connection = source.connection;             // HTTP connection
  this.socket = source.socket;                     // TCP Socket

  if (source.query) {
    this.query = source.query; // 查询参数
  }
  else {
    this.query = ~source.url.indexOf('?')
      ? qs.parse(url.parse(source.url).query)
      : {};
  }
};

// ? Read
// http.serverRequest methods
['setEncoding'].forEach(function (method) {
  // RequestStream # <method>
  RequestStream.prototype[method] = function () {
    // proxy for this.request.<method>
    return this.request[method].apply(this.request, arguments);
  };
});

