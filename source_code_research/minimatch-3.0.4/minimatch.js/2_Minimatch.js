/* 核心类 */
function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options);
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }

  if (!options) options = {};
  pattern = pattern.trim();

  // ========== 以上为参数校验 ==========

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    // 将 sep 改为 /
    pattern = pattern.split(path.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false; // 模式为注释
  this.empty = false; // 模式为空

  // make the set of regexps etc.
  this.make(); // 初始化
}
