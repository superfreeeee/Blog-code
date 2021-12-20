/*
 * buffered-stream.js: A simple(r) Stream which is partially buffered into memory.
 *
 * (C) 2010, Mikeal Rogers
 *
 * Adapted for Flatiron
 * (C) 2011, Charlie Robbins & the Contributors
 * MIT LICENSE
 *
 */

var events = require('events'),
    fs = require('fs'),
    stream = require('stream'),
    util = require('util');

//
// ### function BufferedStream (limit)
// #### @limit {number} **Optional** Size of the buffer to limit
// Constructor function for the BufferedStream object responsible for
// maintaining a stream interface which can also persist to memory
// temporarily.
//

/**
 * 缓冲流
 */
// ? Read
var BufferedStream = module.exports = function (limit) {
  // 使用构造函数继承
  events.EventEmitter.call(this);

  if (typeof limit === 'undefined') {
    // 缓冲容量限制
    limit = Infinity;
  }

  // 配置参数初始化
  this.limit = limit;
  this.size = 0;        // 当前缓冲区占用空间
  this.chunks = [];     // 缓冲块
  this.writable = true; // 是否为可写
  this.readable = true; // 是否为可读
  this._buffer = true;  // 是否开启缓冲
};

// 继承 Stream 接口
util.inherits(BufferedStream, stream.Stream);

// ? Read
// prototype.buffer
Object.defineProperty(BufferedStream.prototype, 'buffer', {
  get: function () {
    // 获取缓冲流
    return this._buffer;
  },
  set: function (value) {
    // 设置缓冲
    if (!value && this.chunks) {
      var self = this;
      // 无 value 且 chunks 不为空时，触发 data 事件
      this.chunks.forEach(function (c) { self.emit('data', c) });
      // ended 标志触发 end 事件
      if (this.ended) this.emit('end');
      // 刷新缓冲
      this.size = 0;
      delete this.chunks;
    }

    // 新 value 作为缓冲对象
    this._buffer = value;
  }
});

/**
 * 将管道数据接入另一个可写流当中
 * @returns 
 */
// ? Read
BufferedStream.prototype.pipe = function () {
  var self = this,
      dest;

  if (self.resume) {
    self.resume();
  }

  // 接入下一个可写流（arguments）
  dest = stream.Stream.prototype.pipe.apply(self, arguments);

  //
  // just incase you are piping to two streams, do not emit data twice.
  // note: you can pipe twice, but you need to pipe both streams in the same tick.
  // (this is normal for streams)
  //
  if (this.piped) {
    return dest;
  }

  process.nextTick(function () {
    if (self.chunks) {
      // 残留缓存数据作为 data 事件发出
      self.chunks.forEach(function (c) { self.emit('data', c) });
      self.size = 0;
      delete self.chunks;
    }

    if (!self.readable) {
      if (self.ended) {
        // 结束事件
        self.emit('end');
      }
      else if (self.closed) {
        // 关闭事件
        self.emit('close');
      }
    }
  });

  // piped 标志表示多次 pipe 调用只触发一次 pipe 事件
  this.piped = true;

  return dest;
};

/**
 * 写入缓冲数据（chunk）
 * @param {*} chunk 
 * @returns 
 */
// ? Read
BufferedStream.prototype.write = function (chunk) {
  // 已销毁（chunks 为空）、已接上其他通道
  if (!this.chunks || this.piped) {
    // 直接发起 data 事件
    this.emit('data', chunk);
    return;
  }

  // 写入 chunks
  this.chunks.push(chunk);
  this.size += chunk.length;
  if (this.limit < this.size) {
    // 超出容量限制，触发暂停事件
    this.pause();
  }
};

/**
 * 结束缓冲流
 *   ended 标志
 */
// ? Read
BufferedStream.prototype.end = function () {
  this.readable = false;
  this.ended = true;
  this.emit('end');
};

/**
 * 销毁缓冲流
 *   readble = writable = true
 *   chunks 置空表示销毁缓存空间
 */
// ? Read
BufferedStream.prototype.destroy = function () {
  this.readable = false;
  this.writable = false;
  delete this.chunks;
};

/**
 * 关闭缓冲流
 *   closed 标志
 */
// ? Read
BufferedStream.prototype.close = function () {
  this.readable = false;
  this.closed = true;
};

// ? Read
// Stream 版本 pause 的 polyfill(直接触发对应事件)
if (!stream.Stream.prototype.pause) {
  BufferedStream.prototype.pause = function () {
    this.emit('pause');
  };
}

// ? Read
// Stream 版本 resume 的 polyfill(直接触发对应事件)
if (!stream.Stream.prototype.resume) {
  BufferedStream.prototype.resume = function () {
    this.emit('resume');
  };
}

