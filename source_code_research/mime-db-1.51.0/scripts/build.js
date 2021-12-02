var db = {};

// initialize with all the IANA types
/**
 * 初始化所有 -types.json 文件
 */
// ? Read
addData(db, require('../src/iana-types.json'), 'iana');

// add the mime extensions from Apache
addData(db, require('../src/apache-types.json'), 'apache');

// add the mime extensions from nginx
addData(db, require('../src/nginx-types.json'), 'nginx');

// now add all our custom data
addData(db, require('../src/custom-types.json'));

// finally, all custom suffix defaults
var mime = require('../src/custom-suffix.json');
// ? Read
// suffix => s
Object.keys(mime).forEach(function (suffix) {
  var s = mime[suffix];

  // type => d
  Object.keys(db).forEach(function (type) {
    // 相同后缀类型
    if (type.substr(0 - suffix.length) !== suffix) {
      return;
    }

    var d = db[type];
    if (d.compressible === undefined) d.compressible = s.compressible;
  });
});

// 写入 db.json
// write db
require('./lib/write-db')('db.json', db);

/**
 * Add mime data to the db, marked as a given source.
 * 导入 -types.json
 */
// ? Read
function addData(db, mime, source) {
  Object.keys(mime).forEach(function (key) {
    var data = mime[key];
    var type = key.toLowerCase();
    var obj = (db[type] = db[type] || createTypeEntry(source));

    // add missing data
    // 添加 obj.charset
    setValue(obj, 'charset', data.charset);
    // 添加 obj.compressible
    setValue(obj, 'compressible', data.compressible);

    // append new extensions
    // 添加 obj.extensions
    appendExtensions(obj, data.extensions);
  });
}

/**
 * Append an extension to an object.
 * 等价于 obj.extensions.push(extension)
 */
// ? Read
function appendExtension(obj, extension) {
  if (!obj.extensions) {
    obj.extensions = [];
  }

  if (obj.extensions.indexOf(extension) === -1) {
    obj.extensions.push(extension);
  }
}

/**
 * Append extensions to an object.
 * 等价于 obj.extensions.push(...extensions)
 */
// ? Read
function appendExtensions(obj, extensions) {
  if (!extensions) {
    return;
  }

  for (var i = 0; i < extensions.length; i++) {
    var extension = extensions[i];

    // add extension to the type entry
    appendExtension(obj, extension);
  }
}

/**
 * Create a new type entry, optionally marked from a source.
 * 创建 { source } 对象
 */
// ? Read
function createTypeEntry(source) {
  var obj = {};

  if (source !== undefined) {
    obj.source = source;
  }

  return obj;
}

/**
 * Set a value on an object, if not already set.
 * 未定义才 set
 */
// ? Read
function setValue(obj, prop, value) {
  if (value !== undefined && obj[prop] === undefined) {
    obj[prop] = value;
  }
}
