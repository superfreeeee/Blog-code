Minimatch.prototype.match = match;

/* 匹配字符串 */
function match(f, partial) {
  this.debug('match', f, this.pattern);
  // short-circuit in the case of busted things.
  // comments, etc.
  // 1. 匹配注释
  if (this.comment) return false;
  // 2. 匹配空串
  if (this.empty) return f === '';

  // 3. 匹配 /
  if (f === '/' && partial) return true;

  var options = this.options;

  // windows: need to use /, not \
  // 4. 统一分界符 /
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/');
  }

  // treat the test path as a set of pathparts.
  // 5. 按 / 拆分 => f = []
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  // 6. 获取分解好的模式 => this.set = []
  var set = this.set;
  this.debug(this.pattern, 'set', set);

  // Find the basename of the path by looking for the last non-empty segment
  var filename; // basename
  var i;
  for (i = f.length - 1; i >= 0; i--) { // 后往前
    filename = f[i];
    if (filename) break;
  }

  // 7. 测试命中
  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate) return true;
      return !this.negate;
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  // 8. 未命中
  if (options.flipNegate) return false;
  return this.negate;
}
