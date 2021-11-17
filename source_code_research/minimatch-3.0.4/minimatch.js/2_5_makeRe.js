// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';

Minimatch.prototype.makeRe = makeRe;
function makeRe() {
  // 手动发起 regexp 的创建
  if (this.regexp || this.regexp === false) return this.regexp;

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  // 1. 保证 this.set 为转变后的正则表达式片段
  var set = this.set;

  // 解析失败
  if (!set.length) {
    this.regexp = false;
    return this.regexp;
  }
  var options = this.options;

  var twoStar = options.noglobstar
    ? star // '*'
    : options.dot
    ? twoStarDot // '**.'
    : twoStarNoDot; // '**'
  var flags = options.nocase ? 'i' : '';

  var re = set
    .map(function (pattern) {
      return pattern
        .map(function (p) {
          return p === GLOBSTAR
            ? twoStar // p === GLOBSTAR === {}
            : typeof p === 'string'
            ? regExpEscape(p) // p === string(plain text)
            : p._src; // p === regexp
        })
        .join('\\/'); // s1/s2/s3/...
    })
    .join('|'); // p1|p2|p3|...

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'; // 头尾

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'; // 取反

  try {
    // 构建完整正则表达式
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    // 构建失败
    this.regexp = false;
  }
  return this.regexp;
}
