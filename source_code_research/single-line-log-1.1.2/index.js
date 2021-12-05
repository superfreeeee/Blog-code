//                          esc [ 1 0 0 0 D
var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
//                        esc [ 1 A
var MOVE_UP = new Buffer('1b5b3141', 'hex').toString();
//                           esc [ 0 K
var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
var stringWidth = require('string-width');

/**
 * 装饰 stream 输出流
 * @param {*} stream
 * @returns
 */
module.exports = function (stream) {
  // 保留原始 write 方法
  var write = stream.write;
  // 待写入字符串
  var str;

  stream.write = function (data) {
    // 保证数据源 str（所以说你的闭包呢hh）
    if (str && data !== str) str = null;
    return write.apply(this, arguments);
  };

  if (stream === process.stderr || stream === process.stdout) {
    process.on('exit', function () {
      // 退出 node 时打印空串做结
      if (str !== null) stream.write('');
    });
  }

  var prevLineCount = 0;
  var log = function () {
    str = '';
    var nextStr = Array.prototype.join.call(arguments, ' ');

    // Clear screen
    // 清理前一次的输出
    for (var i = 0; i < prevLineCount; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount - 1 ? MOVE_UP : '');
    }

    // Actual log output
    // 真实输出
    str += nextStr;
    stream.write(str);

    // How many lines to remove on next clear screen
    // 计算下一次需要清理的距离
    var prevLines = nextStr.split('\n');
    prevLineCount = 0;
    for (var i = 0; i < prevLines.length; i++) {
      prevLineCount +=
        Math.ceil(stringWidth(prevLines[i]) / stream.columns) || 1;
    }
  };

  // 清理输出
  log.clear = function () {
    stream.write('');
  };

  return log;
};

// 代理 stdout、stderr
module.exports.stdout = module.exports(process.stdout);
module.exports.stderr = module.exports(process.stderr);
