/*
 * index.js: Top-level plugin exposing HTTP features in flatiron
 *
 * (C) 2011, Charlie Robbins & the Contributors
 * MIT LICENSE
 *
 */

var union = exports;

//
// Expose version information
//
exports.version = require('../package.json').version; // 版本号

//
// Expose core union components
//
// 导出主类
union.BufferedStream = require('./buffered-stream');
union.HttpStream     = require('./http-stream');
union.ResponseStream = require('./response-stream');
union.RoutingStream  = require('./routing-stream');
// 导出方法
union.createServer   = require('./core').createServer;
union.errorHandler   = require('./core').errorHandler;
