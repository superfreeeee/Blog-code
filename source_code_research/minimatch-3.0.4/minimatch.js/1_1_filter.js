minimatch.filter = filter;

/* 生成过滤函数 */
function filter(pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch(p, pattern, options);
  };
}
