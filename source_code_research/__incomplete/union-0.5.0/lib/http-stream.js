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
    BufferedStream = require('./buffered-stream');

/**
 * Http 流对象类型
 */
// ? Read
var HttpStream = module.exports = function (options) {
  options = options || {};
  BufferedStream.call(this, options.limit); // 父类构造函数

  // 关闭缓冲
  if (options.buffer === false) {
    this.buffer = false;
  }

  // pipe 事件接上 pipeState 处理函数
  this.on('pipe', this.pipeState);
};

// ? 继承 BufferedStream
util.inherits(HttpStream, BufferedStream);

// ? Read
//
// ### function pipeState (source)
// #### @source {ServerRequest|HttpStream} Source stream piping to this instance
// Pipes additional HTTP metadata from the `source` HTTP stream (either concrete or
// abstract) to this instance. e.g. url, headers, query, etc.
//
// Remark: Is there anything else we wish to pipe?
//
HttpStream.prototype.pipeState = function (source) {
  // 传递 headers、trailers、method
  this.headers = source.headers;
  this.trailers = source.trailers;
  this.method = source.method;

  // 传递 url
  if (source.url) {
    this.url = this.originalUrl = source.url;
  }

  // 传递 query
  if (source.query) {
    this.query = source.query;
  }
  else if (source.url) {
    this.query = ~source.url.indexOf('?')
      ? qs.parse(url.parse(source.url).query)
      : {};
  }
};
