/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */
// ? Read
exports = module.exports = function(a, b){
  if (a && b) {
    // 使用 for..in 将 b 的属性复制到 a
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
