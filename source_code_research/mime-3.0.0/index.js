'use strict';

let Mime = require('./Mime');

// ? Read
// 完整版引入 standard 与 other
module.exports = new Mime(
  require('./types/standard'),
  require('./types/other')
);
