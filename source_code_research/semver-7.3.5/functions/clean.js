const parse = require('./parse');
/**
 * 清理开头 v= 符号，剪裁前后空格，解析有效版本号
 * @param {*} version
 * @param {*} options
 * @returns
 */
// ? Read
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options);
  return s ? s.version : null;
};
module.exports = clean;
