'use strict';

let Mime = require('./Mime');

// ? Read
// 轻量版只引入 standard
module.exports = new Mime(require('./types/standard'));
