var fs = require('fs');

/**
 * 生成 db.json
 * @param {*} fileName
 * @param {*} obj
 */
// ? Read
module.exports = function writeDatabaseSync(fileName, obj) {
  var fd = fs.openSync(fileName, 'w');
  // keys 排序
  var keys = Object.keys(obj).sort();

  /**
   整体结构如下
   {
     "<type>": {
       "<key>": "<val>",
       // ...
       "<key>": "<val>"
     },
     // ...
   }
   */
  // {
  fs.writeSync(fd, '{\n');

  keys.forEach(function (key, i, arr) {
    // "<type>": {
    fs.writeSync(fd, '  ' + JSON.stringify(key) + ': {');

    var end = endLine.apply(this, arguments);
    var data = obj[key];
    var keys = Object.keys(data).sort(sortDataKeys);

    // 无内容直接闭合 }
    if (keys.length === 0) {
      fs.writeSync(fd, '}' + end);
      return;
    }

    // 有内容先换行
    fs.writeSync(fd, '\n');
    keys.forEach(function (key, i, arr) {
      var end = endLine.apply(this, arguments);
      var val = data[key];

      if (val !== undefined) {
        var str =
          Array.isArray(val) &&
          val.some(function (v) {
            return String(v).length > 15;
          })
            ? JSON.stringify(val, null, 2).split('\n').join('\n    ')
            : JSON.stringify(val);
        // "<key>": "<val>"<end>
        fs.writeSync(fd, '    ' + JSON.stringify(key) + ': ' + str + end);
      }
    });
    // }
    fs.writeSync(fd, '  }' + end);
  });

  // }
  fs.writeSync(fd, '}\n');

  fs.closeSync(fd);
};

// ? 换行
function endLine(key, i, arr) {
  // 未结束对象加一个 ,
  var comma = i + 1 === arr.length ? '' : ',';
  return comma + '\n';
}

/**
 * 按 localeCompare 排序（字母序）
 * @param {*} a
 * @param {*} b
 * @returns
 */
// ? Read
function sortDataKeys(a, b) {
  var cmp = a.localeCompare(b);

  return cmp && (a === 'source' || b === 'source')
    ? a === 'source'
      ? -1
      : 1
    : cmp;
}
