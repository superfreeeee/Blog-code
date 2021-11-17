// normalizes slashes.
var slashSplit = /\/+/;

Minimatch.prototype.debug = function () {};

Minimatch.prototype.make = make;

/* 初始化 Minimatch */
function make() {
  // don't do it more than once.
  if (this._made) return;

  var pattern = this.pattern;
  var options = this.options;

  // empty patterns and comments match nothing.
  // 1. 匹配模式为注释 =>
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return;
  }
  // 2. 匹配模式为空 =>
  if (!pattern) {
    this.empty = true;
    return;
  }

  // step 1: figure out negation, etc.
  // 3. 裁剪前导 !
  this.parseNegate();

  // step 2: expand braces
  // 4. 花括号展开 => [p1, p2, p3, ...]
  var set = (this.globSet = this.braceExpand());

  if (options.debug) this.debug = console.error; // debug 输出，默认为 () => {}

  this.debug(this.pattern, set);

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  // 5. 按 / 分开 => [[p1], [p2], [p3], ...]
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit);
  });

  this.debug(this.pattern, set);

  // glob --> regexps
  // 6. 将 glob 表达式片段转 regexp
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this);
  }, this);

  this.debug(this.pattern, set);

  // filter out everything that didn't compile properly.
  // 7. 过滤匹配失败的表达式
  set = set.filter(function (s) {
    return s.indexOf(false) === -1;
  });

  this.debug(this.pattern, set);

  this.set = set;
}
