/**
 * Expose secure-compare
 */

module.exports = compare;


/**
 * 安全比较
 * Secure compare
 */
// ? Read
function compare (a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  
  var mismatch = a.length === b.length ? 0 : 1;
  if (mismatch) {
    b = a;
  }
  
  // 遍历所有符号
  for (var i = 0, il = a.length; i < il; ++i) {
    // 使用 | 聚；使用 ^ 做等式判断；比较 charCode
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  }
  
  // 0 表示完全相等
  return mismatch === 0;
};
